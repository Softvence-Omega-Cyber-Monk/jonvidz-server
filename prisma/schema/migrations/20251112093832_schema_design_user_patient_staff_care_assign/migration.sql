/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffID]` on the table `staffs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseNumber]` on the table `staffs` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `permissions` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'MODERATOR', 'PATIENT', 'DOCTOR', 'NURSE');

-- DropForeignKey
ALTER TABLE "public"."patients" DROP CONSTRAINT "patients_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "primaryDoctorId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "permissions",
ADD COLUMN     "permissions" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "staffs" ALTER COLUMN "staffID" DROP NOT NULL,
ALTER COLUMN "specialty" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleId",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "patient_care_assignments" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "shiftDuration" TEXT,
    "patientId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_care_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_staffID_key" ON "staffs"("staffID");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_licenseNumber_key" ON "staffs"("licenseNumber");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_care_assignments" ADD CONSTRAINT "patient_care_assignments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_care_assignments" ADD CONSTRAINT "patient_care_assignments_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
