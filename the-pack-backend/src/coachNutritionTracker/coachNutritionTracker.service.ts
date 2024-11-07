import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CoachNutritionTrackerService{
    constructor(private prisma: PrismaService){}

    async getAllUserNutritionTrackers(coachId: string){
        return this.prisma.coachNutritionTracker.findMany({
            where: {
                coachId: coachId
            },
            include:{
                userNutritionTracker: true
            }
        })
    }

}