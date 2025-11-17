-- CreateTable
CREATE TABLE "suction_logs" (
    "id" TEXT NOT NULL,
    "comments" TEXT,
    "signature" TEXT,
    "userId" TEXT,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "suction_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "suction_logs" ADD CONSTRAINT "suction_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suction_logs" ADD CONSTRAINT "suction_logs_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
