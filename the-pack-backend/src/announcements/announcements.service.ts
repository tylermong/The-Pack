import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {Prisma, Announcement} from '@prisma/client'
import { CreateAnnouncementDto } from "./dtos/CreateAnnouncement.dto";

@Injectable()

export class AnnouncementsService{
    constructor(private prisma: PrismaService){}

    async createAnnouncement(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
        return this.prisma.announcement.create({
          data: {
            title: createAnnouncementDto.title,
            content: createAnnouncementDto.content,
            coach: {
              connect: {
                id: createAnnouncementDto.coach.connect.id,
              },
            },
          },
        });
      }

    async updateAnnouncement(id:string, data: Prisma.AnnouncementUpdateInput): Promise<Announcement>{
        return this.prisma.announcement.update({
            where: {id},
            data,
        });
    }

    async deleteAnnouncement(id:string): Promise<Announcement>{
        return this.prisma.announcement.delete({
            where: { id },
        });
    }
    async findAnnouncementsByCoach(coachId: string): Promise<Announcement[]>{
        return this.prisma.announcement.findMany({
            where: {coachId},
        });
    }
}