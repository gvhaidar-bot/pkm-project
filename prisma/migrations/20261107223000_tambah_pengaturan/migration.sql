CREATE TABLE "Pengaturan" (
    "id" SERIAL NOT NULL,
    "kunci" TEXT NOT NULL,
    "nilai" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengaturan_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Pengaturan_kunci_key" ON "Pengaturan"("kunci");
