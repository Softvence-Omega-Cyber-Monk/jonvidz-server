/*
  Warnings:

  - Added the required column `administeredAsPrescribed` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MadicationStatus" AS ENUM ('Given', 'Not_Given');

-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "administeredAsPrescribed" BOOLEAN NOT NULL,
ADD COLUMN     "patientId" TEXT,
ADD COLUMN     "status" "MadicationStatus",
ADD COLUMN     "time_of_admanistative" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "mar" (
    "id" TEXT NOT NULL,
    "comments" TEXT,
    "signature" TEXT,
    "full_e_cylinder" TEXT,
    "empty_e_cylinder" TEXT,
    "userId" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
