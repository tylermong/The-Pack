import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NutritionTrackerService } from './userNutritionTracker.service';
import { Prisma } from '@prisma/client';
import { CreateNutritionTracker } from './dtos/create-userNutritionTracker.dto';

@Controller('userNutritionTracker')
export class NutritionTrackerController{
    constructor(private readonly nutritionTrackerService: NutritionTrackerService){}
    
    @Post()
    async createNutritionTracker(@Body() data:CreateNutritionTracker){
        return await this.nutritionTrackerService.createNutritionTracker(data)
    }
}