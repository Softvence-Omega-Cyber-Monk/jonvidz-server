/*
  Warnings:

  - You are about to drop the column `medication_name` on the `mar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicationId]` on the table `mar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `medicationId` to the `mar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicationRoute" AS ENUM ('ORAL', 'Nebulizer', 'Intravenous', 'Intramuscular', 'INHALED', 'TOPICAL');

-- CreateEnum
CREATE TYPE "MadicationStatus" AS ENUM ('Given', 'Not_Given');

-- AlterTable
ALTER TABLE "mar" DROP COLUMN "medication_name",
ADD COLUMN     "medicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "route",
ADD COLUMN     "route" "MedicationRoute" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "MadicationStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "mar_medicationId_key" ON "mar"("medicationId");

-- AddForeignKey
ALTER TABLE "mar" ADD CONSTRAINT "mar_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
