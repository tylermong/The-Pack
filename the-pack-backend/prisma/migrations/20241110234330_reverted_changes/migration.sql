/*
  Warnings:

  - Changed the type of `date` on the `coachAvailability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `scheduling` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "coachAvailability" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "scheduling" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL;
