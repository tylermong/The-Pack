/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `CoachKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `CoachKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_timeSlotId_fkey";

-- AlterTable
ALTER TABLE "CoachKey" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "scheduling" ALTER COLUMN "timeSlotId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoachKey_key_key" ON "CoachKey"("key");

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
