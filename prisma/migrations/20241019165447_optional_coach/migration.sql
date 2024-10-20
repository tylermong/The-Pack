/*
  Warnings:

  - A unique constraint covering the columns `[phoneNum]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNum` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_usersCoachid_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNum" INTEGER NOT NULL,
ALTER COLUMN "usersCoachid" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNum_key" ON "User"("phoneNum");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usersCoachid_fkey" FOREIGN KEY ("usersCoachid") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
