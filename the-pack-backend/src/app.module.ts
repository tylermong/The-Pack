import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CoachModule } from './coach/coach.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ClassModule } from './classes/class.module';
import { userClassesModule } from './userClasses/userClasses.module';
import { schedulingModule } from './scheduling/scheduling.module';
import { ConfigModule } from '@nestjs/config';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessagesModule } from './messages/messages.module';
import { CoachKeyModule } from './coach-key/coach-key.module';
import { CoachAvailabilityModule } from './coachAvailability/coachAvailability.module';
import { ProgramsModule } from './programs/programs.module';
import { TimeSlotModule } from './timeslot/timeslot.module';
import { NutritionTrackerModule } from './nutritionTracker/nutritionTracker.module';
import { AdminModule } from './admin/admin.module';
import { ChatroomParticipantsModule } from './chatroom-participants/chatroom-participants.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) ,PrismaModule, UserModule, 
    CoachModule, AnnouncementsModule, ClassModule, userClassesModule, 
    schedulingModule, AuthModule, ChatroomModule, MessagesModule, 
    CoachKeyModule, CoachAvailabilityModule, ProgramsModule, 
    TimeSlotModule, NutritionTrackerModule, AdminModule, ChatroomParticipantsModule],
  
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}