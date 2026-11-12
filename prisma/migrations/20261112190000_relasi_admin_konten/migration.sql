-- AlterTable
ALTER TABLE "Galeri" ADD COLUMN "diunggahOlehId" INTEGER;
ALTER TABLE "Pengaturan" ADD COLUMN "diubahOlehId" INTEGER;
ALTER TABLE "ProgramAkademik" ADD COLUMN "dibuatOlehId" INTEGER;
ALTER TABLE "Ekstrakurikuler" ADD COLUMN "dibuatOlehId" INTEGER;
ALTER TABLE "PercobaanLogin" ADD COLUMN "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Galeri" ADD CONSTRAINT "Galeri_diunggahOlehId_fkey" FOREIGN KEY ("diunggahOlehId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Pengaturan" ADD CONSTRAINT "Pengaturan_diubahOlehId_fkey" FOREIGN KEY ("diubahOlehId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ProgramAkademik" ADD CONSTRAINT "ProgramAkademik_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Ekstrakurikuler" ADD CONSTRAINT "Ekstrakurikuler_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PercobaanLogin" ADD CONSTRAINT "PercobaanLogin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
