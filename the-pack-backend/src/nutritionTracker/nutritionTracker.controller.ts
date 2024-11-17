import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Put } from '@nestjs/common';
import { NutritionTrackerService } from './nutritionTracker.service';
import { Prisma } from '@prisma/client';
import { CreateNutritionTrackerDto } from './dtos/create-userNutritionTracker.dto';
import { UpdateNutritionTrackerDto } from './dtos/update-userNutritionTracker.dto';
import { MealType } from '@prisma/client';

@Controller('nutritionTracker')
export class NutritionTrackerController{
    constructor(private readonly nutritionTrackerService: NutritionTrackerService){}

@Get(':userId')
async getNutritionEntries(
    @Param('userId') userId: string,
    @Query('mealType') mealType?: MealType,
) {
    if (mealType && !Object.values(MealType).includes(mealType)) {
    throw new BadRequestException(`Invalid meal type. Valid options are: ${Object.values(MealType).join(', ')}`);
    }
    return await this.nutritionTrackerService.getNutritionEntries(userId, mealType);
}

@Post()
async createNutritionEntry(@Body() createNutritionTrackerDto: CreateNutritionTrackerDto) {
    return await this.nutritionTrackerService.createNutritionEntry(createNutritionTrackerDto);
}
  // Update an existing nutrition tracker entry
  @Put(':id')
  async updateNutritionEntry(
    @Param('id') id: string,
    @Body() updateNutritionTrackerDto: UpdateNutritionTrackerDto,
  ) {
    return await this.nutritionTrackerService.updateNutritionEntry(id, updateNutritionTrackerDto);
  }

  // Delete a nutrition tracker entry
  @Delete(':id')
  async deleteNutritionEntry(@Param('id') id: string) {
    return await this.nutritionTrackerService.deleteNutritionEntry(id);
  }
}
