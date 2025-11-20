/*
  Warnings:

  - The `route` column on the `medications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `medications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "mar" ADD COLUMN     "isCheck" BOOLEAN,
ADD COLUMN     "medication_name" TEXT,
ADD COLUMN     "schedule" TIMESTAMP(3),
ADD COLUMN     "standardDose" VARCHAR(100),
ADD COLUMN     "status" TEXT,
ADD COLUMN     "time_of_administration" TEXT;

-- AlterTable
ALTER TABLE "medications" ALTER COLUMN "standardDose" DROP NOT NULL,
DROP COLUMN "route",
ADD COLUMN     "route" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- DropEnum
DROP TYPE "public"."MadicationStatus";

-- DropEnum
DROP TYPE "public"."MedicationRoute";
