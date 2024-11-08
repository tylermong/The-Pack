import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NutritionTrackerService } from './nutritionTracker.service';
import { Prisma } from '@prisma/client';
import { CreateNutritionTracker } from './dtos/create-userNutritionTracker.dto';
import { UpdateNutritionTrackerDto } from './dtos/update-userNutritionTracker.dto';

@Controller('userNutritionTracker')
export class NutritionTrackerController{
    constructor(private readonly nutritionTrackerService: NutritionTrackerService){}
    
    @Post()
    async createNutritionTracker(@Body() data:CreateNutritionTracker){
        return await this.nutritionTrackerService.createNutritionTracker(data)
    }

    @Get('user/:userId')
    async getUserNutritionData(@Param('userId') userId: string) {
        return await this.nutritionTrackerService.getUserNutritionData(userId);
    }
    @Patch(':nutritionId')
    async modifyNutrition(
        @Param('nutritionId') nutritionId: string,
        @Body() updateNutritionDto: UpdateNutritionTrackerDto, // Use DTO for validation
      ){
        return await this.nutritionTrackerService.modifyNutritionTracker(nutritionId, updateNutritionDto);
      }
      
    @Delete(':nutritionId')
    async deleteUserNutrition(@Param('nutritionId') nutritionId: string){
        return await this.nutritionTrackerService.deleteNutritionTracker(nutritionId)
    }
}