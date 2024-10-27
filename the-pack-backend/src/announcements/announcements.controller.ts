import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementsDto } from './dto/create-announcements.dto';
import { UpdateAnnouncementsDto } from './dto/update-announcements.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  createAnnouncements(@Body() { authorId, ...createAnnouncementsData }: CreateAnnouncementsDto) {
    return this.announcementsService.create(authorId, createAnnouncementsData);
  }

  @Patch(':id')
    updateAnnouncements(
      @Param('id') id:string,
      @Body() updateAnnouncementsDto: UpdateAnnouncementsDto
    ){
      return this.announcementsService.update(id, updateAnnouncementsDto)
    }
  @Get()
  findAll() {
    return this.announcementsService.findAll();
  } 
  @Delete(':id')
  deleteAnnouncements(@Param('id') id:string){
    return this.announcementsService.delete(id)
  }
  @Get('author/:authorId')
  findAnnouncementsByAuthor(@Param('authorId') authorId: string) {
    return this.announcementsService.findByAuthor(authorId);
  }
}