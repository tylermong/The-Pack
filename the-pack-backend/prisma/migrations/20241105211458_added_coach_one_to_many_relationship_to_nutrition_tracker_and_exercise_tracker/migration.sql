/*
  Warnings:

  - You are about to drop the column `progress` on the `exerciseTracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exerciseTracker" DROP COLUMN "progress",
ADD COLUMN     "coachId" TEXT;

-- AlterTable
ALTER TABLE "nutritionTracker" ADD COLUMN     "coachId" TEXT;

-- AddForeignKey
ALTER TABLE "nutritionTracker" ADD CONSTRAINT "nutritionTracker_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseTracker" ADD CONSTRAINT "exerciseTracker_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
