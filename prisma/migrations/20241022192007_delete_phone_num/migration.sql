/*
  Warnings:

  - You are about to drop the column `phoneNum` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phoneNum_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNum";
