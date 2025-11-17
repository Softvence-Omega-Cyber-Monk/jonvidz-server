/*
  Warnings:

  - You are about to alter the column `hrBPM` on the `vital_parameters` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `rrBPM` on the `vital_parameters` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `spO2Pct` on the `vital_parameters` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "vital_parameters" ALTER COLUMN "hrBPM" SET DEFAULT 0,
ALTER COLUMN "hrBPM" SET DATA TYPE INTEGER,
ALTER COLUMN "rrBPM" SET DEFAULT 0,
ALTER COLUMN "rrBPM" SET DATA TYPE INTEGER,
ALTER COLUMN "spO2Pct" SET DEFAULT 0.00,
ALTER COLUMN "spO2Pct" SET DATA TYPE DECIMAL(5,2);

-- CreateTable
CREATE TABLE "vent_settings" (
    "id" TEXT NOT NULL,
    "tidalVolumeOrPressure" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "iTimeSec" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "ieRatio" DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    "riseTime" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "iTrigger" DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    "tempC" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "fiO2Pct" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "heatedHumidifierTemp" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "flowSheetId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vent_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vent_settings" ADD CONSTRAINT "vent_settings_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vent_settings" ADD CONSTRAINT "vent_settings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
