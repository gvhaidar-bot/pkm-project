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
  } catch (e) {
    console.error("[auth] Gagal membaca tabel PercobaanLogin:", e);
    return null;
  }
}

function sedangDiblokir(baris: BarisBatas | null): boolean {
  return !!baris?.blokirSampai && baris.blokirSampai.getTime() > Date.now();
}

async function catatGagal(kunci: string, batas: number) {
  try {
    const sekarang = new Date();
    const batasJendela = new Date(sekarang.getTime() - JENDELA_MS);

    // Reset atomik jika jendela waktu percobaan sebelumnya sudah kedaluwarsa
    const direset = await prisma.percobaanLogin.updateMany({
      where: { kunci, jendelaMulai: { lt: batasJendela } },
      data: { jumlah: 1, jendelaMulai: sekarang, blokirSampai: null },
    });

    if (direset.count > 0) return;

    // Increment atomik di level database untuk mencegah race condition permintaan paralel
    const baris = await prisma.percobaanLogin.upsert({
      where: { kunci },
      create: { kunci, jumlah: 1, jendelaMulai: sekarang },
      update: { jumlah: { increment: 1 } },
    });

    if (baris.jumlah >= batas && (!baris.blokirSampai || baris.blokirSampai <= sekarang)) {
      await prisma.percobaanLogin.updateMany({
        where: { kunci, blokirSampai: baris.blokirSampai },
        data: { blokirSampai: new Date(sekarang.getTime() + JENDELA_MS) },
      });
    }
  } catch (e) {
    console.error("[auth] Gagal mencatat percobaan login:", e);
  }
}

async function hapusBatas(kunci: string) {
  try {
    await prisma.percobaanLogin.deleteMany({ where: { kunci } });
  } catch (e) {
    console.error("[auth] Gagal menghapus batas login:", e);
  }
}

async function tautkanAdmin(kunci: string, adminId: number) {
  try {
    await prisma.percobaanLogin.updateMany({
      where: { kunci, adminId: null },
      data: { adminId },
    });
  } catch (e) {
    console.error("[auth] Gagal menautkan percobaan login ke admin:", e);
  }
}

function bersihkanIp(nilai: string | null | undefined): string | null {
  const bersih = nilai?.trim();
  if (!bersih) return null;
  return bersih.slice(0, 64);
}

function ambilIp(request: Request | undefined): string {
  // Prioritaskan header tunggal yang ditetapkan oleh reverse proxy tepercaya
  const vercelIp = bersihkanIp(request?.headers.get("x-vercel-forwarded-for")?.split(",").at(-1));
  if (vercelIp) return vercelIp;
  const cfIp = bersihkanIp(request?.headers.get("cf-connecting-ip"));
  if (cfIp) return cfIp;
  const realIp = bersihkanIp(request?.headers.get("x-real-ip"));
  if (realIp) return realIp;

  // Ambil hop paling kanan pada X-Forwarded-For (ditambahkan proxy terdekat), bukan [0] yang mudah dipalsukan klien
  const xff = request?.headers.get("x-forwarded-for");
  if (xff?.trim()) {
    const hopTerakhir = bersihkanIp(xff.split(",").at(-1));
    if (hopTerakhir) return hopTerakhir;
  }
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
          if (admin) await tautkanAdmin(kunciKombinasi, admin.id);
          return null;
        }

        await hapusBatas(kunciKombinasi);
        return { id: String(admin.id), name: admin.nama, email: admin.email };
      },
    }),
  ],
});
