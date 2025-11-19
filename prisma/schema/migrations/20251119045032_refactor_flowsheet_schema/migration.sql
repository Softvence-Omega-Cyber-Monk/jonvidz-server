/*
  Warnings:

  - A unique constraint covering the columns `[flowSheetId]` on the table `alarms_parameters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flowSheetId]` on the table `measured_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flowSheetId]` on the table `offvent_monitoring` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flowSheetId]` on the table `vent_settings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flowSheetId]` on the table `vital_parameters` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "AssignmentStatus" ADD VALUE 'COMPLETED';

-- CreateIndex
CREATE UNIQUE INDEX "alarms_parameters_flowSheetId_key" ON "alarms_parameters"("flowSheetId");

-- CreateIndex
CREATE UNIQUE INDEX "measured_data_flowSheetId_key" ON "measured_data"("flowSheetId");

-- CreateIndex
CREATE UNIQUE INDEX "offvent_monitoring_flowSheetId_key" ON "offvent_monitoring"("flowSheetId");

-- CreateIndex
CREATE UNIQUE INDEX "vent_settings_flowSheetId_key" ON "vent_settings"("flowSheetId");

-- CreateIndex
CREATE UNIQUE INDEX "vital_parameters_flowSheetId_key" ON "vital_parameters"("flowSheetId");
