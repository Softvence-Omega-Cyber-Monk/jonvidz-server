/*
  Warnings:

  - The values [NEB,IV,IM] on the enum `MedicationRoute` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MedicationRoute_new" AS ENUM ('ORAL', 'Nebulizer', 'Intravenous', 'Intramuscular', 'INHALED', 'TOPICAL');
ALTER TABLE "medications" ALTER COLUMN "route" TYPE "MedicationRoute_new" USING ("route"::text::"MedicationRoute_new");
ALTER TYPE "MedicationRoute" RENAME TO "MedicationRoute_old";
ALTER TYPE "MedicationRoute_new" RENAME TO "MedicationRoute";
DROP TYPE "public"."MedicationRoute_old";
COMMIT;
