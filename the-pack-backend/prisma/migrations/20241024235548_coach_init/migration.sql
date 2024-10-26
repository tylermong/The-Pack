-- AlterTable
ALTER TABLE "User" ADD COLUMN     "usersCoachid" TEXT;

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNum" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'COACH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_phoneNum_key" ON "Coach"("phoneNum");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usersCoachid_fkey" FOREIGN KEY ("usersCoachid") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
