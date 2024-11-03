import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CoachModule } from './coach/coach.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ClassesModule } from './classes/classes.module';
import { userClassesModule } from './userClasses/userClasses.module';
import { schedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [PrismaModule, UserModule, CoachModule, 
    AnnouncementsModule, ClassesModule, userClassesModule, schedulingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}