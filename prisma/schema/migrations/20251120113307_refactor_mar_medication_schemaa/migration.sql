/*
  Warnings:

  - Added the required column `medicationId` to the `mar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mar" ADD COLUMN     "medicationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
