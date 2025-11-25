-- CreateEnum
CREATE TYPE "SystemActionType" AS ENUM ('UPDATE_CONFIG', 'CREATE_CONFIG', 'RESET');

-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL,
    "defaultTimezone" TEXT,
    "retentionDays" INTEGER,
    "chartingPeriod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_log" (
    "id" TEXT NOT NULL,
    "action" "SystemActionType" NOT NULL,
    "actorId" TEXT,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_log_pkey" PRIMARY KEY ("id")
);
