import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

const BATAS_GAGAL_KOMBINASI = 5;
const BATAS_GAGAL_IP = 20;
const JENDELA_MS = 15 * 60 * 1000;

const HASH_DUMMY = "$2b$12$MGGErlXY.meZBQKuslvuAum4YkB2DJmtU94aJiXjFf/ZLc1gbr.mC";

type BarisBatas = { blokirSampai: Date | null };

async function ambilBatas(kunci: string): Promise<BarisBatas | null> {
  try {
    return await prisma.percobaanLogin.findUnique({ where: { kunci } });
  } catch {
    return null;
  }
}

function sedangDiblokir(baris: BarisBatas | null): boolean {
  return !!baris?.blokirSampai && baris.blokirSampai.getTime() > Date.now();
}

async function catatGagal(kunci: string, batas: number) {
  try {
    const sekarang = new Date();
    const baris = await prisma.percobaanLogin.findUnique({ where: { kunci } });
    if (!baris || sekarang.getTime() - baris.jendelaMulai.getTime() > JENDELA_MS) {
      await prisma.percobaanLogin.upsert({
        where: { kunci },
        update: { jumlah: 1, jendelaMulai: sekarang, blokirSampai: null },
        create: { kunci, jumlah: 1, jendelaMulai: sekarang },
      });
      return;
    }
    const jumlah = baris.jumlah + 1;
    await prisma.percobaanLogin.update({
      where: { kunci },
      data: {
        jumlah,
        blokirSampai: jumlah >= batas ? new Date(sekarang.getTime() + JENDELA_MS) : baris.blokirSampai,
      },
    });
  } catch {
    return;
  }
}

async function hapusBatas(kunci: string) {
  try {
    await prisma.percobaanLogin.deleteMany({ where: { kunci } });
  } catch {
    return;
  }
}

function ambilIp(request: Request | undefined): string {
  const diteruskan = request?.headers.get("x-forwarded-for");
  if (diteruskan?.trim()) return diteruskan.split(",")[0].trim();
  const asli = request?.headers.get("x-real-ip");
  if (asli?.trim()) return asli.trim();
  return "lokal";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  jwt: { maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Kata sandi", type: "password" },
      },
      authorize: async (credentials, request) => {
        const emailMentah = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!emailMentah || !password) return null;

        const email = emailMentah.toLowerCase().trim();
        const ip = ambilIp(request);
        const kunciKombinasi = `e:${email}|i:${ip}`;
        const kunciIp = `i:${ip}`;

        const [barisKombinasi, barisIp] = await Promise.all([ambilBatas(kunciKombinasi), ambilBatas(kunciIp)]);
        if (sedangDiblokir(barisKombinasi) || sedangDiblokir(barisIp)) return null;

        const admin = await prisma.admin.findUnique({ where: { email } });
        const cocok = await bcrypt.compare(password, admin?.passwordHash ?? HASH_DUMMY);
        if (!admin || !cocok) {
          await catatGagal(kunciKombinasi, BATAS_GAGAL_KOMBINASI);
          await catatGagal(kunciIp, BATAS_GAGAL_IP);
          return null;
        }

        await hapusBatas(kunciKombinasi);
        return { id: String(admin.id), name: admin.nama, email: admin.email };
      },
    }),
  ],
});
