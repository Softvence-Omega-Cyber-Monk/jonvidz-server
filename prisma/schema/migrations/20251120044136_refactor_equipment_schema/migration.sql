-- DropIndex
DROP INDEX "public"."master_equipment_list_name_key";

-- AlterTable
ALTER TABLE "master_equipment_list" ALTER COLUMN "standard_frequency" SET DEFAULT 'QDAY';
