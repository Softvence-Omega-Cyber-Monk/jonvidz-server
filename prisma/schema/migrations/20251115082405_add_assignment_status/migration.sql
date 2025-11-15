-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ACTIVE', 'LEAVE', 'RELEASE');

-- AlterTable
ALTER TABLE "patient_care_assignments" ADD COLUMN     "status" "AssignmentStatus" NOT NULL DEFAULT 'ACTIVE';
