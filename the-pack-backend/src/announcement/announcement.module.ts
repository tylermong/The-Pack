import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService, PrismaService],
})
export class AnnouncementModule {}
