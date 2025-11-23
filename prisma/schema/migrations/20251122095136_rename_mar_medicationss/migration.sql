/*
  Warnings:

  - You are about to drop the `mar_medications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."mar_medications" DROP CONSTRAINT "mar_medications_marId_fkey";

-- DropForeignKey
ALTER TABLE "public"."mar_medications" DROP CONSTRAINT "mar_medications_medicationId_fkey";

-- DropTable
DROP TABLE "public"."mar_medications";

-- CreateTable
CREATE TABLE "list_of_oadications" (
    "id" TEXT NOT NULL,
    "marId" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,
    "time_of_record" TEXT,
    "schedule" TEXT,
    "status" "MedicationStatus",
    "isCheck" BOOLEAN DEFAULT false,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_of_oadications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "list_of_oadications" ADD CONSTRAINT "list_of_oadications_marId_fkey" FOREIGN KEY ("marId") REFERENCES "mar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_of_oadications" ADD CONSTRAINT "list_of_oadications_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
