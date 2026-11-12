-- CreateTable
CREATE TABLE "PercobaanLogin" (
    "kunci" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 0,
    "jendelaMulai" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blokirSampai" TIMESTAMP(3),

    CONSTRAINT "PercobaanLogin_pkey" PRIMARY KEY ("kunci")
);
