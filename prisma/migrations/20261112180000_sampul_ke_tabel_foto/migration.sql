-- AlterTable
ALTER TABLE "BeritaFoto" ADD COLUMN "utama" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "FasilitasFoto" ADD COLUMN "utama" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "GuruFoto" ADD COLUMN "utama" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "PrestasiFoto" ADD COLUMN "utama" BOOLEAN NOT NULL DEFAULT false;

-- Pindahkan sampul lama menjadi baris foto utama
INSERT INTO "BeritaFoto" ("url", "caption", "urutan", "utama", "beritaId", "createdAt")
SELECT "gambarUrl", NULL, 0, true, "id", CURRENT_TIMESTAMP FROM "Berita" WHERE "gambarUrl" IS NOT NULL;

INSERT INTO "FasilitasFoto" ("url", "caption", "urutan", "utama", "fasilitasId", "createdAt")
SELECT "gambarUrl", NULL, 0, true, "id", CURRENT_TIMESTAMP FROM "Fasilitas" WHERE "gambarUrl" IS NOT NULL;

INSERT INTO "GuruFoto" ("url", "caption", "urutan", "utama", "guruId", "createdAt")
SELECT "fotoUrl", NULL, 0, true, "id", CURRENT_TIMESTAMP FROM "Guru" WHERE "fotoUrl" IS NOT NULL;

INSERT INTO "PrestasiFoto" ("url", "caption", "urutan", "utama", "prestasiId", "createdAt")
SELECT "gambarUrl", NULL, 0, true, "id", CURRENT_TIMESTAMP FROM "Prestasi" WHERE "gambarUrl" IS NOT NULL;

-- AlterTable
ALTER TABLE "Berita" DROP COLUMN "gambarUrl";
ALTER TABLE "Fasilitas" DROP COLUMN "gambarUrl";
ALTER TABLE "Guru" DROP COLUMN "fotoUrl";
ALTER TABLE "Prestasi" DROP COLUMN "gambarUrl";
