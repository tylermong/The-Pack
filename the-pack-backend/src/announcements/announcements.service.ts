import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementsDto } from './dto/create-announcements.dto';

@Injectable()
export class AnnouncementsService {
  constructor (private prismaService: PrismaService) {}


  async create(createAnnouncementsDto: Prisma.announcementsCreateInput) {
    return this.prismaService.announcements.create({
      data: createAnnouncementsDto
    });
  }
  async update(id: string, updateAnnouncementsDto:Prisma.announcementsUpdateInput){
    const existingID = await this.prismaService.announcements.findUnique({
      where: {id},
    });
    if(!existingID){
      throw new Error('Announcement with ID not found')
    }
    return this.prismaService.announcements.update({
      where: {id},
      data: updateAnnouncementsDto
    })
  }

  async findAll(){
    return this.prismaService.announcements.findMany()
  }
  
  async delete(id: string){
    return this.prismaService.announcements.delete({
      where: {id},
    })
  }

  //async findByAuthor(authorId: string){
   // return this.prismaService.announcements.findMany({
    //  where: { authorId},
    //})
  //}
}