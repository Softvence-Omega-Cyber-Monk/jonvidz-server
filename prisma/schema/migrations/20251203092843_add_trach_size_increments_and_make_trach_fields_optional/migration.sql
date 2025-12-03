/*
  Warnings:

  - You are about to drop the column `trachType` on the `vital_parameters` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TrachSize" AS ENUM ('3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TrachType" ADD VALUE 'Shiley_Cuffed';
ALTER TYPE "TrachType" ADD VALUE 'Shiley_Cuffess';
ALTER TYPE "TrachType" ADD VALUE 'Shiley_Fenestrated';
ALTER TYPE "TrachType" ADD VALUE 'Portex_Cuffed';
ALTER TYPE "TrachType" ADD VALUE 'Portex_Cuffess';
ALTER TYPE "TrachType" ADD VALUE 'Portex_Fenestrated';

-- AlterTable
ALTER TABLE "vital_parameters" DROP COLUMN "trachType",
ADD COLUMN     "trachSize" "TrachSize" DEFAULT '3.0';
