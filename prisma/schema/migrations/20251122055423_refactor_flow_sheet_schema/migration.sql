/*
  Warnings:

  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `flow_sheets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "flow_sheets_patientCareAssignmentId_key" ON "flow_sheets"("patientCareAssignmentId");
