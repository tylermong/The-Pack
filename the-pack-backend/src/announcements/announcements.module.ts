import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, PrismaService],
})

export class AnnouncementsModule {}