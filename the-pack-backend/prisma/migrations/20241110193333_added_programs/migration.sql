/*
  Warnings:

  - You are about to drop the `ExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatroomID` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseTracker" DROP CONSTRAINT "ExerciseTracker_userId_fkey";

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "chatroomID" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ExerciseTracker";

-- CreateTable
CREATE TABLE "coachAvailability" (
    "id" TEXT NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "coachAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programs" (
    "id" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programWeeks" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "numOfWeeks" TEXT NOT NULL,

    CONSTRAINT "programWeeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programDays" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weekNum" TEXT NOT NULL,

    CONSTRAINT "programDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyExercise" (
    "id" TEXT NOT NULL,
    "dayNum" TEXT NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "numOfSets" TEXT NOT NULL,
    "numOfReps" TEXT NOT NULL,
    "weightLifted" TEXT NOT NULL,

    CONSTRAINT "dailyExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coachAvailability" ADD CONSTRAINT "coachAvailability_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programWeeks" ADD CONSTRAINT "programWeeks_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programDays" ADD CONSTRAINT "programDays_weekNum_fkey" FOREIGN KEY ("weekNum") REFERENCES "programWeeks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyExercise" ADD CONSTRAINT "dailyExercise_dayNum_fkey" FOREIGN KEY ("dayNum") REFERENCES "programDays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatroomID_fkey" FOREIGN KEY ("chatroomID") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
