-- CreateTable
CREATE TABLE "shift_check_list" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "patientId" TEXT NOT NULL,
    "comments" TEXT,
    "signature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shift_check_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shift_check_list" ADD CONSTRAINT "shift_check_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_check_list" ADD CONSTRAINT "shift_check_list_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
