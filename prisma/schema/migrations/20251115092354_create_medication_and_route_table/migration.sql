-- CreateEnum
CREATE TYPE "MedicationRoute" AS ENUM ('ORAL', 'NEB', 'IV', 'IM', 'INHALED', 'TOPICAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'RECEPTIONIST';
ALTER TYPE "UserRole" ADD VALUE 'LAB_TECHNICIAN';

-- CreateTable
CREATE TABLE "medications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "standardDose" VARCHAR(100) NOT NULL,
    "route" "MedicationRoute" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medications_name_key" ON "medications"("name");
