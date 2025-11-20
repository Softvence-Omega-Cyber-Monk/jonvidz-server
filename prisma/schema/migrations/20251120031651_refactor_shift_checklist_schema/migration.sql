/*
  Warnings:

  - You are about to drop the column `selectedOption` on the `checklist_items` table. All the data in the column will be lost.
  - You are about to drop the column `textResponse` on the `checklist_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checklist_categories" ADD COLUMN     "selectType" TEXT;

-- AlterTable
ALTER TABLE "checklist_items" DROP COLUMN "selectedOption",
DROP COLUMN "textResponse";
