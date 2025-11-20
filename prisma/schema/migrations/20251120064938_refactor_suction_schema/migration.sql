/*
  Warnings:

  - A unique constraint covering the columns `[suctionLogId]` on the table `post_suction_vitals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[suctionLogId]` on the table `pre_suction_vitals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[suctionLogId]` on the table `secretions_description` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_suction_vitals_suctionLogId_key" ON "post_suction_vitals"("suctionLogId");

-- CreateIndex
CREATE UNIQUE INDEX "pre_suction_vitals_suctionLogId_key" ON "pre_suction_vitals"("suctionLogId");

-- CreateIndex
CREATE UNIQUE INDEX "secretions_description_suctionLogId_key" ON "secretions_description"("suctionLogId");
