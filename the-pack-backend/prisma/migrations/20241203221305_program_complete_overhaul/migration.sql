/*
  Warnings:

  - You are about to drop the column `programName` on the `Programs` table. All the data in the column will be lost.
  - You are about to drop the column `programTags` on the `Programs` table. All the data in the column will be lost.
  - You are about to drop the column `programURL` on the `Programs` table. All the data in the column will be lost.
  - You are about to drop the `dailyExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programDays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programWeeks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dailyExercise" DROP CONSTRAINT "dailyExercise_dayId_fkey";

-- DropForeignKey
ALTER TABLE "programDays" DROP CONSTRAINT "programDays_weekId_fkey";

-- DropForeignKey
ALTER TABLE "programWeeks" DROP CONSTRAINT "programWeeks_programId_fkey";

-- AlterTable
ALTER TABLE "Programs" DROP COLUMN "programName",
DROP COLUMN "programTags",
DROP COLUMN "programURL";

-- DropTable
DROP TABLE "dailyExercise";

-- DropTable
DROP TABLE "programDays";

-- DropTable
DROP TABLE "programWeeks";
