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
        return await this.prisma.userNutritionTracker.create({
            data:{
                ...rest,
                userNutrition:{
                    connect: {id: data.userId},
                },
            }
        })
    }

    async getUserNutritionData(userId: string){
        return await this.prisma.userNutritionTracker.findMany({
            where:{
                userId: userId,
            },
            include: {
                userNutrition: true,
            }
        })
    }
    async modifyNutritionTracker(nutritionId: string, data: UpdateNutritionTrackerDto){
        return await this.prisma.userNutritionTracker.update({
            where: {id: nutritionId},
            data: {
                ...data,
            }
        })
    }
}