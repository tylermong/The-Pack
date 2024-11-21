-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_coachId_fkey";

-- DropForeignKey
ALTER TABLE "ChatroomParticipants" DROP CONSTRAINT "ChatroomParticipants_chatroomID_fkey";

-- DropForeignKey
ALTER TABLE "ChatroomParticipants" DROP CONSTRAINT "ChatroomParticipants_userID_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ClassOnDate" DROP CONSTRAINT "ClassOnDate_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassOnDate" DROP CONSTRAINT "ClassOnDate_dateId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatroomID_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userID_fkey";

-- DropForeignKey
ALTER TABLE "NutritionTracker" DROP CONSTRAINT "NutritionTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "Programs" DROP CONSTRAINT "Programs_userId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_availabilityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coachId_fkey";

-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_authorId_fkey";

-- DropForeignKey
ALTER TABLE "coachAvailability" DROP CONSTRAINT "coachAvailability_coachId_fkey";

-- DropForeignKey
ALTER TABLE "dailyExercise" DROP CONSTRAINT "dailyExercise_dayNum_fkey";

-- DropForeignKey
ALTER TABLE "programDays" DROP CONSTRAINT "programDays_weekNum_fkey";

-- DropForeignKey
ALTER TABLE "programWeeks" DROP CONSTRAINT "programWeeks_programId_fkey";

-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_clientId_fkey";

-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_coachId_fkey";

-- DropForeignKey
ALTER TABLE "userClasses" DROP CONSTRAINT "userClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "userClasses" DROP CONSTRAINT "userClasses_clientId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassOnDate" ADD CONSTRAINT "ClassOnDate_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassOnDate" ADD CONSTRAINT "ClassOnDate_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "classDates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userClasses" ADD CONSTRAINT "userClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userClasses" ADD CONSTRAINT "userClasses_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coachAvailability" ADD CONSTRAINT "coachAvailability_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "coachAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionTracker" ADD CONSTRAINT "NutritionTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programWeeks" ADD CONSTRAINT "programWeeks_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programDays" ADD CONSTRAINT "programDays_weekNum_fkey" FOREIGN KEY ("weekNum") REFERENCES "programWeeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyExercise" ADD CONSTRAINT "dailyExercise_dayNum_fkey" FOREIGN KEY ("dayNum") REFERENCES "programDays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_chatroomID_fkey" FOREIGN KEY ("chatroomID") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatroomID_fkey" FOREIGN KEY ("chatroomID") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
