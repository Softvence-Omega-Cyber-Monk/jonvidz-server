/*
  Warnings:

  - You are about to drop the column `standardDose` on the `mar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `flow_sheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `mar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `progress_notes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `shift_check_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientCareAssignmentId]` on the table `suction_logs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientCareAssignmentId` to the `flow_sheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientCareAssignmentId` to the `mar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientCareAssignmentId` to the `progress_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientCareAssignmentId` to the `shift_check_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientCareAssignmentId` to the `suction_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."medications_name_key";

-- AlterTable
ALTER TABLE "flow_sheets" ADD COLUMN     "patientCareAssignmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mar" DROP COLUMN "standardDose",
ADD COLUMN     "patientCareAssignmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "progress_notes" ADD COLUMN     "patientCareAssignmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "shift_check_list" ADD COLUMN     "patientCareAssignmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "suction_logs" ADD COLUMN     "patientCareAssignmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "flow_sheets_patientCareAssignmentId_key" ON "flow_sheets"("patientCareAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "mar_patientCareAssignmentId_key" ON "mar"("patientCareAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "progress_notes_patientCareAssignmentId_key" ON "progress_notes"("patientCareAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "shift_check_list_patientCareAssignmentId_key" ON "shift_check_list"("patientCareAssignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "suction_logs_patientCareAssignmentId_key" ON "suction_logs"("patientCareAssignmentId");

-- AddForeignKey
ALTER TABLE "flow_sheets" ADD CONSTRAINT "flow_sheets_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_notes" ADD CONSTRAINT "progress_notes_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_check_list" ADD CONSTRAINT "shift_check_list_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suction_logs" ADD CONSTRAINT "suction_logs_patientCareAssignmentId_fkey" FOREIGN KEY ("patientCareAssignmentId") REFERENCES "patient_care_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
