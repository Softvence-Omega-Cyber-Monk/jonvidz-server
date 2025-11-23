/*
  Warnings:

  - You are about to drop the `list_of_oadications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."list_of_oadications" DROP CONSTRAINT "list_of_oadications_marId_fkey";

-- DropForeignKey
ALTER TABLE "public"."list_of_oadications" DROP CONSTRAINT "list_of_oadications_medicationId_fkey";

-- DropTable
DROP TABLE "public"."list_of_oadications";

-- CreateTable
CREATE TABLE "list_of_madications" (
    "id" TEXT NOT NULL,
    "marId" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,
    "time_of_record" TEXT,
    "schedule" TEXT,
    "status" "MedicationStatus",
    "isCheck" BOOLEAN DEFAULT false,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_of_madications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "list_of_madications" ADD CONSTRAINT "list_of_madications_marId_fkey" FOREIGN KEY ("marId") REFERENCES "mar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_of_madications" ADD CONSTRAINT "list_of_madications_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
