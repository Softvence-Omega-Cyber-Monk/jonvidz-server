-- CreateEnum
CREATE TYPE "MonitoringMode" AS ENUM ('Trach_Cool_Aerosol_Mist', 'Trach_HME');

-- CreateTable
CREATE TABLE "offvent_monitoring" (
    "id" TEXT NOT NULL,
    "monitoringMode" "MonitoringMode" NOT NULL,
    "withO2BleedIn" BOOLEAN NOT NULL,
    "o2FlowLMin" DECIMAL(5,2),
    "spO2Percent" INTEGER,
    "hrBpm" INTEGER,
    "rrBpm" INTEGER,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "flowSheetId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offvent_monitoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offvent_monitoring" ADD CONSTRAINT "offvent_monitoring_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offvent_monitoring" ADD CONSTRAINT "offvent_monitoring_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
