-- CreateEnum
CREATE TYPE "VentMode" AS ENUM ('AC_VC', 'SIMV', 'PSV', 'PCV', 'CPAP', 'BiPAP');

-- CreateEnum
CREATE TYPE "TrachType" AS ENUM ('Cuffed', 'Uncuffed', 'Fenestrated', 'Cuffless');

-- CreateTable
CREATE TABLE "vital_parameters" (
    "id" TEXT NOT NULL,
    "hrBPM" DOUBLE PRECISION NOT NULL,
    "rrBPM" DOUBLE PRECISION NOT NULL,
    "spO2Pct" DOUBLE PRECISION NOT NULL,
    "ventMode" "VentMode" NOT NULL DEFAULT 'AC_VC',
    "trachType" "TrachType" NOT NULL DEFAULT 'Cuffed',
    "flowSheetId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vital_parameters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vital_parameters" ADD CONSTRAINT "vital_parameters_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vital_parameters" ADD CONSTRAINT "vital_parameters_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
