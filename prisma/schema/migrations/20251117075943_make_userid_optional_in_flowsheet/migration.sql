-- CreateTable
CREATE TABLE "flow_sheets" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flow_sheets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flow_sheets" ADD CONSTRAINT "flow_sheets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flow_sheets" ADD CONSTRAINT "flow_sheets_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
