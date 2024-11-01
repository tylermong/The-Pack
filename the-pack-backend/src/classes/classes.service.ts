import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class classesService {
    constructor(private prisma: PrismaService){}

    async createClass(creatorId: string, data: Prisma.classesCreateInput) {
        return this.prisma.classes.create({
            data: {
                ...data,
                creator: {
                    connect: { id: creatorId }, // Connect the coach using the ID provided
                },
            },
        });
    }

    async getAllClasses() {
        return this.prisma.classes.findMany();
    }

    async deleteClass(classId: string) {
        await this.prisma.classes.delete({
            where: { id: classId },
        });
    }

    async updateClass(classId: string, data: Prisma.classesUpdateInput) {
        return this.prisma.classes.update({
            where: { id: classId },
            data,
        });
    }

    async getClassById(id: string) {
        return this.prisma.classes.findUnique({
            where: { id },
        });
    }
    
    async joinClass(userId: string, classId: string){
        const enrollmentCount = await this.prisma.userClasses.count({
            where: { classId: classId },
          });
      
          // Restrict enrollment if the class is full (8 users)
          if (enrollmentCount >= 8) {
            throw new ConflictException('Class enrollment is full');
          }

        const existingEnrollment = await this.prisma.userClasses.findUnique({
            where:{
                clientId_classId: {clientId: userId, classId: classId},
            },
        });
        if(existingEnrollment){
            throw new Error('User is already enrolled in this class');
        }
        await this.prisma.userClasses.create({
            data:{
                clientId: userId,
                classId: classId,
            },
        });
        return 'User successfully joined the class';
    }
}