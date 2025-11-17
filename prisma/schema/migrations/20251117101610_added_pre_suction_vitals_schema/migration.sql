-- CreateEnum
CREATE TYPE "CheckedPreSuctionVitals" AS ENUM ('ORAL', 'NASAL', 'TRACHEAL');

-- AlterTable
ALTER TABLE "offvent_monitoring" ALTER COLUMN "monitoringMode" DROP NOT NULL,
ALTER COLUMN "withO2BleedIn" DROP NOT NULL;

-- CreateTable
CREATE TABLE "pre_suction_vitals" (
    "id" TEXT NOT NULL,
    "spO2Percent" INTEGER,
    "hr_bpm" INTEGER,
    "pr_bpm" INTEGER,
    "checkedSuctionVital" "CheckedPreSuctionVitals",
    "checked" BOOLEAN,
    "suctionLogId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pre_suction_vitals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pre_suction_vitals" ADD CONSTRAINT "pre_suction_vitals_suctionLogId_fkey" FOREIGN KEY ("suctionLogId") REFERENCES "suction_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_suction_vitals" ADD CONSTRAINT "pre_suction_vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
