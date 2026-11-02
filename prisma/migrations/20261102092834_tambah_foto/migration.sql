-- CreateTable
CREATE TABLE "BeritaFoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "beritaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BeritaFoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FasilitasFoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "fasilitasId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FasilitasFoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuruFoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "guruId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuruFoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestasiFoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "prestasiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrestasiFoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KegiatanFoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "kegiatanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KegiatanFoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BeritaFoto" ADD CONSTRAINT "BeritaFoto_beritaId_fkey" FOREIGN KEY ("beritaId") REFERENCES "Berita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FasilitasFoto" ADD CONSTRAINT "FasilitasFoto_fasilitasId_fkey" FOREIGN KEY ("fasilitasId") REFERENCES "Fasilitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuruFoto" ADD CONSTRAINT "GuruFoto_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestasiFoto" ADD CONSTRAINT "PrestasiFoto_prestasiId_fkey" FOREIGN KEY ("prestasiId") REFERENCES "Prestasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanFoto" ADD CONSTRAINT "KegiatanFoto_kegiatanId_fkey" FOREIGN KEY ("kegiatanId") REFERENCES "Kegiatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
