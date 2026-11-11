-- CreateTable
CREATE TABLE "Galeri" (
    "id" SERIAL NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "KegiatanFoto";

-- DropTable
DROP TABLE "Kegiatan";
