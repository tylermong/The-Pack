import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common'
import { AnnouncementsService } from './announcements.service'
import { Announcement } from '@prisma/client'
import { CreateAnnouncementDto } from './dtos/CreateAnnouncement.dto';

@Controller('announcements')
export class AnnouncementController{
    constructor(private readonly announcementsService: AnnouncementsService){}

    @Post()
    async create(@Body() createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
        return this.announcementsService.createAnnouncement(createAnnouncementDto);
      }
    
    @Get('coachId')
    async findAll(@Param('coachId') coachId: string): Promise<Announcement[]> {
        return this.announcementsService.findAnnouncementsByCoach(coachId);
      }
    
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAnnouncementDto: { title?: string; content?: string },
      ): Promise<Announcement> {
        return this.announcementsService.updateAnnouncement(id, updateAnnouncementDto);
      }
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Announcement> {
        return this.announcementsService.deleteAnnouncement(id);
    }  

}