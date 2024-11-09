import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from '@prisma/client'; // Assuming 'UserRole' is an enum in Prisma (you can use 'Role' directly from your model)

import { CreateExerciseTrackerDto } from "./dtos/CreateExerciseTracker.dto";


@Injectable()
export class ExerciseTrackerService{
    constructor(private prisma:PrismaService){}

    async createUserExerciseEntry(data: CreateExerciseTrackerDto ){
        const {userId, ...rest} = data;
        
        return await this.prisma.exerciseTracker.create({
            data: {
                ...rest,
    
                user:{
                    connect: {id:userId}
                },
                date: new Date()
            }
        })
    }

    async getUserExerciseEntries(userId: string){
        return this.prisma.exerciseTracker.findMany({
            where:{
                userId:userId
            }
        })
    }

    async getUserExerciseEntriesForCoach(coachId: string){
        return this.prisma.exerciseTracker.findMany({
            include: {
                user: true
            }
        })
    }

    
    async deleteUserExerciseEntry(exerciseId:string){
        await this.prisma.exerciseTracker.delete({
            where: {id: exerciseId}
        })
    }
}