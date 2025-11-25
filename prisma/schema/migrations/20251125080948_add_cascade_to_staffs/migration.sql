-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_userId_fkey";

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
