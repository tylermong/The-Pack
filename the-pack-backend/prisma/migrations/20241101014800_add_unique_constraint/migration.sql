/*
  Warnings:

  - A unique constraint covering the columns `[clientId,classId]` on the table `userClasses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userClasses_clientId_classId_key" ON "userClasses"("clientId", "classId");
