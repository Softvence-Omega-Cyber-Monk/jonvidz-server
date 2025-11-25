/*
  Warnings:

  - The `chartingPeriod` column on the `system_config` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ChartingPeriodTYpe" AS ENUM ('Daily', 'Weekly', 'Bi_Weekly', 'Monthly', 'Quarterly');

-- AlterTable
ALTER TABLE "system_config" DROP COLUMN "chartingPeriod",
ADD COLUMN     "chartingPeriod" "ChartingPeriodTYpe";
