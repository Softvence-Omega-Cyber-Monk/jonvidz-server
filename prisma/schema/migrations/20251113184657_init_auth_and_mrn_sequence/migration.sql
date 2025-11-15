-- CreateTable
CREATE TABLE "daily_sequence" (
    "date" TEXT NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "daily_sequence_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_primaryDoctorId_fkey" FOREIGN KEY ("primaryDoctorId") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
