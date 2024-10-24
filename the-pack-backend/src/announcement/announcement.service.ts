import { Injectable } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor (private prismaSerivce: PrismaService) {}


  async create(authorId: string, data: Prisma.announcementsCreateWithoutAuthorInput) {
    return this.prismaSerivce.announcements.create({
      data: {
        ...data,
        authorId

    }});
  }
  async update(id: string, updateAnnouncementDto:Prisma.announcementsUpdateInput){
    const existingID = await this.prismaSerivce.announcements.findUnique({
      where: {id},
    });
    if(!existingID){
      throw new Error('Announcement with ID not found')
    }
    return this.prismaSerivce.announcements.update({
      where: {id},
      data: updateAnnouncementDto
    })
  }

  async findAll(){
    return this.prismaSerivce.announcements.findMany()
  }
  
}
