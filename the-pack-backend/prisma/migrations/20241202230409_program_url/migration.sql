/*
  Warnings:

  - Added the required column `programURL` to the `Programs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programs" ADD COLUMN     "programURL" TEXT NOT NULL;
