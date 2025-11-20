/*
  Warnings:

  - The values [Nebulizer,Intravenous,Intramuscular] on the enum `MedicationRoute` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `medicationId` on the `mar` table. All the data in the column will be lost.
  - Made the column `standardDose` on table `medications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MedicationRoute_new" AS ENUM ('ORAL', 'NEB', 'IV', 'IM', 'INHALED', 'TOPICAL');
ALTER TABLE "medications" ALTER COLUMN "route" TYPE "MedicationRoute_new" USING ("route"::text::"MedicationRoute_new");
ALTER TYPE "MedicationRoute" RENAME TO "MedicationRoute_old";
ALTER TYPE "MedicationRoute_new" RENAME TO "MedicationRoute";
DROP TYPE "public"."MedicationRoute_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."mar" DROP CONSTRAINT "mar_medicationId_fkey";

-- DropIndex
DROP INDEX "public"."mar_medicationId_key";

-- AlterTable
ALTER TABLE "mar" DROP COLUMN "medicationId";

-- AlterTable
ALTER TABLE "medications" ALTER COLUMN "standardDose" SET NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
