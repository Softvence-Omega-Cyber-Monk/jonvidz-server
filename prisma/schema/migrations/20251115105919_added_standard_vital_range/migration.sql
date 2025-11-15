-- CreateEnum
CREATE TYPE "VitalSignType" AS ENUM ('HEART_RATE_BPM', 'RESPIRATORY_RATE_BPM', 'OXYGEN_SAT_PERCENTAGE');

-- CreateTable
CREATE TABLE "standard_vital_ranges" (
    "id" TEXT NOT NULL,
    "vitalSignType" "VitalSignType" NOT NULL,
    "maxValue" INTEGER,
    "minValue" INTEGER,
    "minAcceptablePercentage" INTEGER,
    "normalRangeText" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "standard_vital_ranges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "standard_vital_ranges_vitalSignType_key" ON "standard_vital_ranges"("vitalSignType");
