import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNutritionTracker } from "./dtos/create-userNutritionTracker.dto";
import { UpdateNutritionTrackerDto } from "./dtos/update-userNutritionTracker.dto";

@Injectable()
export class NutritionTrackerService{
    constructor(private prisma: PrismaService){}

    async createNutritionTracker(data: CreateNutritionTracker){
        const{userId, ...rest} = data;
        return await this.prisma.nutritionTracker.create({
            data:{
                ...rest,
                user:{
                    connect: {id: data.userId},
                },
            }
        })
    }

    async getAllNutritionDataForCoach(coachId: string){
        return await this.prisma.nutritionTracker.findMany({
            include: {
                user: true
            }
        })
    }
//User can view their own nutrition they have created. 
    async getUserNutritionData(userId: string){
        return await this.prisma.nutritionTracker.findMany({
            where:{
                userId: userId,
            },
            include: {
                user: true,
            }
        })
    }
    async modifyNutritionTracker(nutritionId: string, data: UpdateNutritionTrackerDto){
        return await this.prisma.nutritionTracker.update({
            where: {id: nutritionId},
            data: {
                ...data,
            }
        })
    }

    async deleteNutritionTracker(nutritionId: string){
        return await this.prisma.nutritionTracker.delete({
            where: {id: nutritionId}
        })
    }
}