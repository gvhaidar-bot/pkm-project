-- CreateTable
CREATE TABLE "KategoriBerita" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "KategoriBerita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KategoriBerita_nama_key" ON "KategoriBerita"("nama");

-- Isi kategori awal
INSERT INTO "KategoriBerita" ("nama") VALUES
    ('Pengumuman'),
    ('Akademik'),
    ('Kegiatan'),
    ('Prestasi'),
    ('Keagamaan'),
    ('Lainnya')
ON CONFLICT ("nama") DO NOTHING;

-- AlterTable
ALTER TABLE "Berita" ADD COLUMN "kategoriId" INTEGER;

-- Isi kategoriId dari kolom teks lama
UPDATE "Berita" SET "kategoriId" = (SELECT "id" FROM "KategoriBerita" WHERE "KategoriBerita"."nama" = "Berita"."kategori");
UPDATE "Berita" SET "kategoriId" = (SELECT "id" FROM "KategoriBerita" WHERE "nama" = 'Lainnya') WHERE "kategoriId" IS NULL;

-- AlterTable
ALTER TABLE "Berita" ALTER COLUMN "kategoriId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Berita_kategoriId_idx" ON "Berita"("kategoriId");

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriBerita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Berita" DROP COLUMN "kategori";
