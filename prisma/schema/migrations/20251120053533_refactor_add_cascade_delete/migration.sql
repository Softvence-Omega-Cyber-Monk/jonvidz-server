-- DropForeignKey
ALTER TABLE "public"."checklist_categories" DROP CONSTRAINT "checklist_categories_shiftCheckListId_fkey";

-- DropForeignKey
ALTER TABLE "public"."checklist_items" DROP CONSTRAINT "checklist_items_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "checklist_categories" ADD CONSTRAINT "checklist_categories_shiftCheckListId_fkey" FOREIGN KEY ("shiftCheckListId") REFERENCES "shift_check_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "checklist_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
