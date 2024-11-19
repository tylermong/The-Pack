/*
  Warnings:

  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_chatroomID_fkey";

-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_userID_fkey";

-- DropTable
DROP TABLE "Participants";

-- CreateTable
CREATE TABLE "ChatroomParticipants" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "chatroomID" TEXT NOT NULL,

    CONSTRAINT "ChatroomParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatroomParticipants_userID_chatroomID_key" ON "ChatroomParticipants"("userID", "chatroomID");

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_chatroomID_fkey" FOREIGN KEY ("chatroomID") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
