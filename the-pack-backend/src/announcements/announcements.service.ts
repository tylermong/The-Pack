import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor (private prismaService: PrismaService) {}

  async create(authorId: string, data: Prisma.announcementsCreateWithoutAuthorInput) {
    return this.prismaService.announcements.create({
      data: {
        ...data,
        authorId

    }});
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

  async findByAuthor(authorId: string){
    return this.prismaService.announcements.findMany({
      where: { authorId},
    })
  }
}