/*
  Warnings:

  - The `noteType` column on the `progress_notes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."patients" DROP CONSTRAINT "patients_userId_fkey";

-- AlterTable
ALTER TABLE "progress_notes" DROP COLUMN "noteType",
ADD COLUMN     "noteType" TEXT;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
