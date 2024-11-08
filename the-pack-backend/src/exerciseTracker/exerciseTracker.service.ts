import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
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

}