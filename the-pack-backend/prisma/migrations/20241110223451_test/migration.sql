/*
  Warnings:

  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachNutritionTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userNutritionTracker` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID,chatroomID]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `coachAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoachExerciseTracker" DROP CONSTRAINT "CoachExerciseTracker_coachId_fkey";

-- DropForeignKey
ALTER TABLE "CoachExerciseTracker" DROP CONSTRAINT "CoachExerciseTracker_exerciseTrackerId_fkey";

-- DropForeignKey
ALTER TABLE "CoachNutritionTracker" DROP CONSTRAINT "CoachNutritionTracker_coachId_fkey";

-- DropForeignKey
ALTER TABLE "CoachNutritionTracker" DROP CONSTRAINT "CoachNutritionTracker_nutritionTrackerId_fkey";

-- DropForeignKey
ALTER TABLE "userExerciseTracker" DROP CONSTRAINT "userExerciseTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "userNutritionTracker" DROP CONSTRAINT "userNutritionTracker_userId_fkey";

-- AlterTable
ALTER TABLE "coachAvailability" ADD COLUMN     "date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "scheduling" ADD COLUMN     "date" DATE NOT NULL;

-- DropTable
DROP TABLE "Coach";

-- DropTable
DROP TABLE "CoachExerciseTracker";

-- DropTable
DROP TABLE "CoachNutritionTracker";

-- DropTable
DROP TABLE "userExerciseTracker";

-- DropTable
DROP TABLE "userNutritionTracker";

-- CreateIndex
CREATE UNIQUE INDEX "Messages_userID_chatroomID_key" ON "Messages"("userID", "chatroomID");
