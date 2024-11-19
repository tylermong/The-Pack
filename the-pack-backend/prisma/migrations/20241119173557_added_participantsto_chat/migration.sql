-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "chatroomID" TEXT NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participants_userID_chatroomID_key" ON "Participants"("userID", "chatroomID");

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_chatroomID_fkey" FOREIGN KEY ("chatroomID") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
