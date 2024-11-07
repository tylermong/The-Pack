import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachNutritionTrackerService } from './coachNutritionTracker.service';
import { Prisma } from '@prisma/client';

@Controller('coachNutritionTracker')
export class CoachNutritionTrackerController{
    constructor(private readonly coachNutritionTrackerService: CoachNutritionTrackerService){}

    @Get(':coachId')
    async getAllNutritionForCoach(@Param('coachId') coachId: string) {
        return await this.coachNutritionTrackerService.getAllUserNutritionTrackers(coachId);
  }
}