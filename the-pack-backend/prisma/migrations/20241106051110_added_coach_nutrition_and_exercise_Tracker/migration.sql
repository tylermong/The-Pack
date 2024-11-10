/*
  Warnings:

  - You are about to drop the `exerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nutritionTracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exerciseTracker" DROP CONSTRAINT "exerciseTracker_coachId_fkey";

-- DropForeignKey
ALTER TABLE "exerciseTracker" DROP CONSTRAINT "exerciseTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "nutritionTracker" DROP CONSTRAINT "nutritionTracker_coachId_fkey";

-- DropForeignKey
ALTER TABLE "nutritionTracker" DROP CONSTRAINT "nutritionTracker_userId_fkey";

-- DropTable
DROP TABLE "exerciseTracker";

-- DropTable
DROP TABLE "nutritionTracker";

-- CreateTable
CREATE TABLE "userNutritionTracker" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "timeSlot" TEXT,
    "calories" INTEGER,
    "protein" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fats" DOUBLE PRECISION,
    "notes" TEXT,
    "mealType" "MealType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userNutritionTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userExerciseTracker" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeSlot" TEXT,
    "duration" INTEGER,
    "intensity" "ExerciseIntensity",
    "caloriesBurned" INTEGER,
    "exerciseType" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userExerciseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachExerciseTracker" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "exerciseTrackerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachExerciseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachNutritionTracker" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "nutritionTrackerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachNutritionTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userNutritionTracker" ADD CONSTRAINT "userNutritionTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userExerciseTracker" ADD CONSTRAINT "userExerciseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachExerciseTracker" ADD CONSTRAINT "CoachExerciseTracker_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachExerciseTracker" ADD CONSTRAINT "CoachExerciseTracker_exerciseTrackerId_fkey" FOREIGN KEY ("exerciseTrackerId") REFERENCES "userExerciseTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachNutritionTracker" ADD CONSTRAINT "CoachNutritionTracker_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachNutritionTracker" ADD CONSTRAINT "CoachNutritionTracker_nutritionTrackerId_fkey" FOREIGN KEY ("nutritionTrackerId") REFERENCES "userNutritionTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
