/*
  Warnings:

  - A unique constraint covering the columns `[medicationId]` on the table `mar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mar_medicationId_key" ON "mar"("medicationId");
