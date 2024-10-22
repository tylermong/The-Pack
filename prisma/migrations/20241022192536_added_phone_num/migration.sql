/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usersCoachid` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_usersCoachid_fkey";

-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_authorId_fkey";

-- DropForeignKey
ALTER TABLE "userClassrooms" DROP CONSTRAINT "userClassrooms_userid_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
DROP COLUMN "usersCoachid",
ADD COLUMN     "phoneNum" INTEGER;
