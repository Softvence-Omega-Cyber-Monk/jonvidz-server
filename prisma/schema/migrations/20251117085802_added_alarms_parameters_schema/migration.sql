-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Normal', 'AbNormal');

-- CreateEnum
CREATE TYPE "Medication_ENUM" AS ENUM ('Given', 'Not_Given');

-- CreateTable
CREATE TABLE "alarms_parameters" (
    "id" TEXT NOT NULL,
    "hi_p" INTEGER NOT NULL DEFAULT 0,
    "lo_p" INTEGER NOT NULL DEFAULT 0,
    "low_ve" INTEGER NOT NULL DEFAULT 0,
    "apnea_s" INTEGER NOT NULL DEFAULT 0,
    "head_of_bed" INTEGER NOT NULL DEFAULT 0,
    "pmv" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'Normal',
    "medication" "Medication_ENUM" NOT NULL DEFAULT 'Not_Given',
    "flowSheetId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alarms_parameters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alarms_parameters" ADD CONSTRAINT "alarms_parameters_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alarms_parameters" ADD CONSTRAINT "alarms_parameters_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
