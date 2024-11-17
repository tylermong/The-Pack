
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dtos/createClass.dto';
import { UpdateClassDto } from './dtos/updateClass.dto';
import { ClassResponseDto } from './dtos/classRespose.dto';


@Injectable()
export class ClassService {
    constructor(private prisma: PrismaService){}
    
    async createClass(creatorId: string, data: CreateClassDto) {
        // Prepare class dates if provided
        const classDatesData = data.classDates?.map(({ date, startTime, endTime }) => ({
          date: { create: { date } }, // Creating a classDates entry for each date
          startTime,
          endTime,
        }));
      
        // Create the class with the necessary relations
        return this.prisma.class.create({
          data: {
            name: data.name,
            description: data.description, // Optional field
            creator: { connect: { id: creatorId } }, // Connect the creator (user)
            assignedCoach: {
              connect: { id: data.assignedCoachId }, // Connect the assigned coach (user)
            },
            classDates: {
              create: classDatesData, // Create class dates if provided
            },
          },
          include: {
            classDates: true, // Include classDates in the response
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

    async updateClass(classId: string, data: UpdateClassDto) {
        const updatedClass = await this.prisma.class.update({
          where: { id: classId },
          data: {
            name: data.name,
            description: data.description,
            assignedCoach: data.assignedCoachId
              ? { connect: { id: data.assignedCoachId } }
              : undefined, // Leave coach empty if not provided
      
            classDates: {
              // Step 1: Remove existing classDates
              deleteMany: {
                classId: classId,
              },
              // Step 2: Add new class dates
              create: data.classDates?.map(({ date, startTime, endTime }) => ({
                date: { create: { date } }, // Create new classDates entries if not already in DB
                startTime,
                endTime,
              })),
              // If you want to link existing `classDates`, use `connect`:
              // connect: data.classDates?.map(({ id }) => ({
              //   id,
              // })),
            },
          },
          include: {
            classDates: true,  // Include classDates in the response
          },
        });
      
        return updatedClass;
      }
    
      
      
      async getClassById(id: string) {
        const classData = await this.prisma.class.findUnique({
          where: { id },
          include: {
            creator: true,
            assignedCoach: true,
            classDates: true,
          },
        });
      
        if (classData) {
          return {
            id: classData.id,
            name: classData.name,
            description: classData.description,
            creator: classData.creator,
            assignedCoach: classData.assignedCoach,
            classDates: classData.classDates.map((date: any) => ({
              id: date.id,
              startTime: date.startTime,
              endTime: date.endTime,
            })),
          };
        }
      
        return null;
      }
      
}