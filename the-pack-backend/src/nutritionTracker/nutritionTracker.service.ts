import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNutritionTrackerDto } from "./dtos/create-userNutritionTracker.dto";
import { UpdateNutritionTrackerDto } from "./dtos/update-userNutritionTracker.dto";
import { MealType } from "@prisma/client";

@Injectable()
export class NutritionTrackerService{
    constructor(private prisma: PrismaService){}

    async getNutritionEntries(userId: string, mealType?: MealType) {
        return await this.prisma.nutritionTracker.findMany({
          where: {
            userId,
            ...(mealType && { mealType }), // If mealType is provided, filter by it
          },
          orderBy: {
            date: 'desc', // Sort by date in descending order
          },
        });
      }
    
      // Create a new nutrition tracker entry
      async createNutritionEntry(createNutritionTrackerDto: CreateNutritionTrackerDto) {
        return await this.prisma.nutritionTracker.create({
          data: {
            userId: createNutritionTrackerDto.userId,
            date: createNutritionTrackerDto.date,
            calories: createNutritionTrackerDto.calories,
            protein: createNutritionTrackerDto.protein,
            carbohydrates: createNutritionTrackerDto.carbohydrates,
            fats: createNutritionTrackerDto.fats,
            mealType: createNutritionTrackerDto.mealType,
          },
        });
      }
    
      // Update an existing nutrition tracker entry
      async updateNutritionEntry(id: string, updateNutritionTrackerDto: UpdateNutritionTrackerDto) {
        return await this.prisma.nutritionTracker.update({
          where: { id },
          data: {
            calories: updateNutritionTrackerDto.calories,
            protein: updateNutritionTrackerDto.protein,
            carbohydrates: updateNutritionTrackerDto.carbohydrates,
            fats: updateNutritionTrackerDto.fats,
            mealType: updateNutritionTrackerDto.mealType,
          },
        });
      }
    
      // Delete a nutrition tracker entry
      async deleteNutritionEntry(id: string) {
        return await this.prisma.nutritionTracker.delete({
          where: { id },
        });
      }
    }