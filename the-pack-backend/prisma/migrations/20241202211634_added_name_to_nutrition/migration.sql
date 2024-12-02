/*
  Warnings:

  - Added the required column `name` to the `NutritionTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NutritionTracker" ADD COLUMN     "name" TEXT NOT NULL;
