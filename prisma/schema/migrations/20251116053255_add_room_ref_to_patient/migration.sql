-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'BOOKED');

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "roomId" TEXT;

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
