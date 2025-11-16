-- CreateTable
CREATE TABLE "staff_sequence" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "staff_sequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_sequence_key_key" ON "staff_sequence"("key");
