-- CreateEnum
CREATE TYPE "EquipmentFrequency" AS ENUM ('QDAY', 'QMONTH', 'THREEMOS', 'SIXTYMOS', 'PRN', 'ORAL');

-- CreateTable
CREATE TABLE "master_equipment_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "standardFrequency" "EquipmentFrequency" NOT NULL,
    "notesOrPurpose" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_equipment_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_equipment_list_name_key" ON "master_equipment_list"("name");
