/*
  Warnings:

  - Added the required column `updatedAt` to the `suction_logs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('ShiftAssessment', 'InterventionNote', 'ChangeofCondition');

-- AlterTable
ALTER TABLE "post_suction_vitals" ALTER COLUMN "pr_bpm" DROP NOT NULL;

-- AlterTable
ALTER TABLE "suction_logs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "progress_notes" (
    "id" TEXT NOT NULL,
    "noteType" "NoteType",
    "checked" BOOLEAN,
    "comments" TEXT,
    "signature" TEXT,
    "userId" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progress_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "progress_notes" ADD CONSTRAINT "progress_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_notes" ADD CONSTRAINT "progress_notes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
