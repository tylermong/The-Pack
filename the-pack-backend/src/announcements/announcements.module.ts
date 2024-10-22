import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementsService } from './announcements.service';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
    imports: [PrismaModule],
    controllers: [AnnouncementController],
    providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
