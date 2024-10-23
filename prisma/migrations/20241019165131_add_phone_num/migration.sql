-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'COACH', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersCoachid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNum" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachesClassroom" (
    "id" TEXT NOT NULL,
    "coachid" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classDescription" TEXT NOT NULL,
    "currentlyEnrolled" INTEGER NOT NULL,
    "enrollmentMax" INTEGER NOT NULL,

    CONSTRAINT "CoachesClassroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userClassrooms" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "classEnrolledid" TEXT NOT NULL,

    CONSTRAINT "userClassrooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_phoneNum_key" ON "Coach"("phoneNum");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usersCoachid_fkey" FOREIGN KEY ("usersCoachid") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesClassroom" ADD CONSTRAINT "CoachesClassroom_coachid_fkey" FOREIGN KEY ("coachid") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userClassrooms" ADD CONSTRAINT "userClassrooms_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userClassrooms" ADD CONSTRAINT "userClassrooms_classEnrolledid_fkey" FOREIGN KEY ("classEnrolledid") REFERENCES "CoachesClassroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
