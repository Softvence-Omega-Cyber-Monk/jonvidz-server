/*
  Warnings:

  - You are about to drop the column `isCheck` on the `mar` table. All the data in the column will be lost.
  - You are about to drop the column `medicationId` on the `mar` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `mar` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `mar` table. All the data in the column will be lost.
  - You are about to drop the column `time_of_administration` on the `mar` table. All the data in the column will be lost.
  - You are about to drop the column `administered_as_prescribed` on the `medications` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `medications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `medications` table. All the data in the column will be lost.
  - You are about to drop the column `time_of_admanistative` on the `medications` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MedicationStatus" AS ENUM ('Given', 'Not_Given', 'Pending');

-- DropForeignKey
ALTER TABLE "public"."mar" DROP CONSTRAINT "mar_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."medications" DROP CONSTRAINT "medications_patientId_fkey";

-- DropIndex
DROP INDEX "public"."mar_medicationId_key";

-- AlterTable
ALTER TABLE "mar" DROP COLUMN "isCheck",
DROP COLUMN "medicationId",
DROP COLUMN "schedule",
DROP COLUMN "status",
DROP COLUMN "time_of_administration",
ADD COLUMN     "time_of_record" TEXT,
ALTER COLUMN "patientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "administered_as_prescribed",
DROP COLUMN "patientId",
DROP COLUMN "status",
DROP COLUMN "time_of_admanistative";

-- DropEnum
DROP TYPE "public"."MadicationStatus";

-- CreateTable
CREATE TABLE "mar_medications" (
    "id" TEXT NOT NULL,
    "marId" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,
    "time_of_record" TEXT,
    "schedule" TEXT,
    "status" "MedicationStatus",
    "isCheck" BOOLEAN DEFAULT false,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mar_medications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mar_medications" ADD CONSTRAINT "mar_medications_marId_fkey" FOREIGN KEY ("marId") REFERENCES "mar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mar_medications" ADD CONSTRAINT "mar_medications_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
