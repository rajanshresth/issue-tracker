-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedToUserid" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserid_fkey" FOREIGN KEY ("assignedToUserid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
