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
import { ExerciseTrackerModule } from './userExerciseTracker/userExerciseTracker.module';
import { NutritionTrackerModule } from './userNutritionTracker/userNutritionTracker.module';
import { CoachNutritionTrackerModule } from './coachNutritionTracker/coachNutritionTracker.module';
import { ConfigModule } from '@nestjs/config';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [PrismaModule, UserModule, CoachModule, 
    AnnouncementsModule, ClassesModule, userClassesModule, schedulingModule, AuthModule, 
    NutritionTrackerModule, ExerciseTrackerModule, CoachNutritionTrackerModule],
  imports: [ConfigModule.forRoot({isGlobal: true}) ,PrismaModule, UserModule, CoachModule, 
    AnnouncementsModule, ClassModule, userClassesModule, schedulingModule, AuthModule, ChatroomModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}