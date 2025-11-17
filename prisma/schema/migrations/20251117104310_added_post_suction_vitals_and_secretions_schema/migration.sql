-- CreateEnum
CREATE TYPE "ColorSecretionsDescription" AS ENUM ('CLEAR', 'WHITE', 'YELLOW', 'BLOODY');

-- CreateEnum
CREATE TYPE "ConsistencySecretionsDescription" AS ENUM ('THIN', 'THICK', 'TENACIOUS');

-- CreateEnum
CREATE TYPE "AmountSecretionsDescription" AS ENUM ('SMALL', 'MODERATE', 'LARGE');

-- CreateTable
CREATE TABLE "post_suction_vitals" (
    "id" TEXT NOT NULL,
    "sp_o2" INTEGER,
    "hr_bpm" INTEGER,
    "pr_bpm" INTEGER NOT NULL,
    "checked" BOOLEAN,
    "suctionLogId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_suction_vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secretions_description" (
    "id" TEXT NOT NULL,
    "color" "ColorSecretionsDescription",
    "consistency" "ConsistencySecretionsDescription",
    "amount" "AmountSecretionsDescription",
    "suctionLogId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "secretions_description_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_suction_vitals" ADD CONSTRAINT "post_suction_vitals_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_suction_vitals" ADD CONSTRAINT "post_suction_vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secretions_description" ADD CONSTRAINT "secretions_description_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secretions_description" ADD CONSTRAINT "secretions_description_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
