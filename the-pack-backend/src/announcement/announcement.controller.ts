import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  createAnnouncement(@Body() { authorId, ...createAnnouncementData }: CreateAnnouncementDto) {
    return this.announcementService.create(authorId, createAnnouncementData);
  }

  @Patch(':id')
    updateAnnouncement(
      @Param('id') id:string,
      @Body() updateAnnouncementDto: UpdateAnnouncementDto
    ){
      return this.announcementService.update(id, updateAnnouncementDto)
    }
  @Get()
  findAll() {
    return this.announcementService.findAll();
  } 

}
