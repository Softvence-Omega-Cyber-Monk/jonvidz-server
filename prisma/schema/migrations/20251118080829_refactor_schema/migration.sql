/*
  Warnings:

  - You are about to drop the column `notesOrPurpose` on the `master_equipment_list` table. All the data in the column will be lost.
  - You are about to drop the column `standardFrequency` on the `master_equipment_list` table. All the data in the column will be lost.
  - You are about to drop the column `administeredAsPrescribed` on the `medications` table. All the data in the column will be lost.
  - You are about to drop the column `hrBpm` on the `offvent_monitoring` table. All the data in the column will be lost.
  - You are about to drop the column `o2FlowLMin` on the `offvent_monitoring` table. All the data in the column will be lost.
  - You are about to drop the column `rrBpm` on the `offvent_monitoring` table. All the data in the column will be lost.
  - You are about to drop the column `spO2Percent` on the `offvent_monitoring` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "master_equipment_list" DROP COLUMN "notesOrPurpose",
DROP COLUMN "standardFrequency",
ADD COLUMN     "notes_or_purpose" TEXT,
ADD COLUMN     "standard_frequency" "EquipmentFrequency";

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "administeredAsPrescribed",
ADD COLUMN     "administered_as_prescribed" BOOLEAN;

-- AlterTable
ALTER TABLE "offvent_monitoring" DROP COLUMN "hrBpm",
DROP COLUMN "o2FlowLMin",
DROP COLUMN "rrBpm",
DROP COLUMN "spO2Percent",
ADD COLUMN     "hr_bpm" INTEGER,
ADD COLUMN     "oto_low_l_min" DECIMAL(5,2),
ADD COLUMN     "rr_bpm" INTEGER,
ADD COLUMN     "spoto_percent" INTEGER;
