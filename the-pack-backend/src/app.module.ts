import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AnnouncementsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
