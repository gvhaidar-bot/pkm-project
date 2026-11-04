-- CreateTable
CREATE TABLE "Ekstrakurikuler" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "kegiatanRutin" TEXT NOT NULL,
    "fasilitas" TEXT NOT NULL,
    "jumlahAnggota" INTEGER,
    "ikon" TEXT NOT NULL DEFAULT 'sains',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ekstrakurikuler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ekstrakurikuler_slug_key" ON "Ekstrakurikuler"("slug");
