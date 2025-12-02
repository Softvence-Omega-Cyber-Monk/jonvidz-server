/*
  Warnings:

  - The values [QBI_WEEK] on the enum `EquipmentFrequency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EquipmentFrequency_new" AS ENUM ('QDAY', 'QWEEK', 'BI_WEEKLY', 'QMONTH', 'THREEMOS', 'SIXTYMOS', 'PRN', 'ORAL');
ALTER TABLE "public"."master_equipment_list" ALTER COLUMN "standard_frequency" DROP DEFAULT;
ALTER TABLE "master_equipment_list" ALTER COLUMN "standard_frequency" TYPE "EquipmentFrequency_new" USING ("standard_frequency"::text::"EquipmentFrequency_new");
ALTER TYPE "EquipmentFrequency" RENAME TO "EquipmentFrequency_old";
ALTER TYPE "EquipmentFrequency_new" RENAME TO "EquipmentFrequency";
DROP TYPE "public"."EquipmentFrequency_old";
ALTER TABLE "master_equipment_list" ALTER COLUMN "standard_frequency" SET DEFAULT 'QDAY';
COMMIT;
