/*
  Warnings:

  - You are about to drop the column `timeSlot` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `NutritionTracker` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `NutritionTracker` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `NutritionTracker` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `NutritionTracker` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `coachAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `scheduling` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `scheduling` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coachId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coach` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `NutritionTracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "timeSlot",
ADD COLUMN     "coach" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NutritionTracker" DROP COLUMN "description",
DROP COLUMN "notes",
DROP COLUMN "timeSlot",
DROP COLUMN "title",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "coachAvailability" DROP COLUMN "timeSlot";

-- AlterTable
ALTER TABLE "scheduling" DROP COLUMN "date",
DROP COLUMN "timeSlot",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ExerciseIntensity";

-- CreateTable
CREATE TABLE "classDates" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassOnDate" (
    "id" SERIAL NOT NULL,
    "classId" TEXT NOT NULL,
    "dateId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassOnDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassOnDate_classId_dateId_key" ON "ClassOnDate"("classId", "dateId");

-- CreateIndex
CREATE UNIQUE INDEX "User_coachId_key" ON "User"("coachId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coach_fkey" FOREIGN KEY ("coach") REFERENCES "User"("coachId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassOnDate" ADD CONSTRAINT "ClassOnDate_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassOnDate" ADD CONSTRAINT "ClassOnDate_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "classDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "coachAvailability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
