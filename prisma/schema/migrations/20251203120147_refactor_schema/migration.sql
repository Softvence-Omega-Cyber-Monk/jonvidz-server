/*
  Warnings:

  - The `trachSize` column on the `vital_parameters` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "vital_parameters" DROP COLUMN "trachSize",
ADD COLUMN     "trachSize" TEXT;

-- DropEnum
DROP TYPE "public"."TrachSize";
