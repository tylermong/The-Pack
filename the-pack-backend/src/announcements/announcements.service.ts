import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AnnouncementsService {
  constructor (private prismaSerivce: PrismaService) {}

  create(authorId: string, createAnnouncementDto: Prisma.announcementsCreateWithoutAuthorInput) {
    return this.prismaSerivce.announcements.create({
      data: {
        ...createAnnouncementDto,
        authorId,
      }
    });
  }

  findAll() {
    return this.prismaSerivce.announcements.findMany()
  }

  findOne(id: string) {
    return this.prismaSerivce.announcements.findUnique({
      where:{
        id,
      }
    });
  }

  update(id: string, updateAnnouncementsDto: Prisma.announcementsUpdateInput) {
    return this.prismaSerivce.user.update({
      where: {
        id,
      },
      data: updateAnnouncementsDto,
    })
  }

  remove(id: string) {
    return this.prismaSerivce.user.delete({
      where:{
        id,
      }
    });
  }
}
