-- AlterTable
ALTER TABLE "assign_equipment" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "standard_vital_ranges" ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "standard_vital_ranges" ADD CONSTRAINT "standard_vital_ranges_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
