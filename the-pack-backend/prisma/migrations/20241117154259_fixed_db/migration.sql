/*
  Warnings:

  - You are about to drop the column `coach` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `CoachKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coachId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `CoachKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_coach_fkey";

-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_timeSlotId_fkey";

-- DropIndex
DROP INDEX "User_coachId_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "coach",
ADD COLUMN     "coachId" TEXT NOT NULL;



-- AlterTable
ALTER TABLE "scheduling" ALTER COLUMN "timeSlotId" DROP NOT NULL;



-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
