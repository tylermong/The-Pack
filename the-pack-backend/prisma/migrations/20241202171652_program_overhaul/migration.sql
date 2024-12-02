/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Programs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Programs` table. All the data in the column will be lost.
  - You are about to drop the column `dayNum` on the `dailyExercise` table. All the data in the column will be lost.
  - You are about to drop the column `numOfReps` on the `dailyExercise` table. All the data in the column will be lost.
  - You are about to drop the column `numOfSets` on the `dailyExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weightLifted` on the `dailyExercise` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `programDays` table. All the data in the column will be lost.
  - You are about to drop the column `weekNum` on the `programDays` table. All the data in the column will be lost.
  - You are about to drop the column `numOfWeeks` on the `programWeeks` table. All the data in the column will be lost.
  - Added the required column `programDescription` to the `Programs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programTags` to the `Programs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `dailyExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `dailyExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setNumber` to the `dailyExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `dailyExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayName` to the `programDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekId` to the `programDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekName` to the `programWeeks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dailyExercise" DROP CONSTRAINT "dailyExercise_dayNum_fkey";

-- DropForeignKey
ALTER TABLE "programDays" DROP CONSTRAINT "programDays_weekNum_fkey";

-- AlterTable
ALTER TABLE "Programs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "programDescription" TEXT NOT NULL,
ADD COLUMN     "programTags" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "dailyExercise" DROP COLUMN "dayNum",
DROP COLUMN "numOfReps",
DROP COLUMN "numOfSets",
DROP COLUMN "weightLifted",
ADD COLUMN     "dayId" TEXT NOT NULL,
ADD COLUMN     "reps" TEXT NOT NULL,
ADD COLUMN     "setNumber" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "programDays" DROP COLUMN "name",
DROP COLUMN "weekNum",
ADD COLUMN     "dayName" TEXT NOT NULL,
ADD COLUMN     "weekId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "programWeeks" DROP COLUMN "numOfWeeks",
ADD COLUMN     "weekName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "programDays" ADD CONSTRAINT "programDays_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "programWeeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyExercise" ADD CONSTRAINT "dailyExercise_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "programDays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
