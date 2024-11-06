import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNutritionTracker } from "./dtos/create-userNutritionTracker.dto";

@Injectable()
export class NutritionTrackerService{
    constructor(private prisma: PrismaService){}

    async createNutritionTracker(data: CreateNutritionTracker){
        
        const{userId, ...rest} = data;
        return await this.prisma.userNutritionTracker.create({
            data:{
                ...rest,
                userNutrition:{
                    connect: {id: data.userId},
                },
            }
        })
    }
}