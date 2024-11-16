
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class ClassService {
    constructor(private prisma: PrismaService){}

    async createClass(creatorId: string, data: Prisma.ClassCreateInput) {
        return this.prisma.class.create({
            data: {
                ...data,
                creator: {
                    connect: { id: creatorId }, // Connect the coach (creator) using the ID
                },
                assignedCoach: {
                    connect: { id: data.assignedCoachId }, // Connect the assigned coach
                },
                classDates: {
                    create: data.classDates?.map(date => ({
                        date: date.date,
                        startTime: date.startTime,
                        endTime: date.endTime,
                    })),
                },
            },
        });
    }
    
    async getAllClass() {
        return this.prisma.class.findMany();
    }

    async deleteClass(classId: string) {
        await this.prisma.class.delete({
            where: { id: classId },
        });
    }

    async updateClass(classId: string, data: Prisma.ClassUpdateInput) {
        return this.prisma.class.update({
            where: { id: classId },
            data,
        });
    }

    async getClassById(id: string) {
        return this.prisma.class.findUnique({
            where: { id },
        });
    }

    
}