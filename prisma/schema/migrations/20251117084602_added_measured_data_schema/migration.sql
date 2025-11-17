-- CreateTable
CREATE TABLE "measured_data" (
    "id" TEXT NOT NULL,
    "pip_cmh_2_o" INTEGER NOT NULL DEFAULT 0,
    "peep_cmh_2_o" INTEGER NOT NULL DEFAULT 0,
    "pmean_cmh_2_o" INTEGER NOT NULL DEFAULT 0,
    "leak_cmh_2_o" INTEGER NOT NULL DEFAULT 0,
    "mve_l_min" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "vte_ml" INTEGER NOT NULL DEFAULT 0,
    "total_rate" INTEGER NOT NULL DEFAULT 0,
    "spont_rate" INTEGER NOT NULL DEFAULT 0,
    "e_time" INTEGER NOT NULL DEFAULT 0,
    "i_time" INTEGER NOT NULL DEFAULT 0,
    "flowSheetId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measured_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measured_data" ADD CONSTRAINT "measured_data_flowSheetId_fkey" FOREIGN KEY ("flowSheetId") REFERENCES "flow_sheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measured_data" ADD CONSTRAINT "measured_data_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
