import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NutritionTrackerService } from './nutritionTracker.service';
import { Prisma } from '@prisma/client';

@Controller('classes')
export class ClassesController{
    constructor(private readonly nutritionTrackerService: NutritionTrackerService){}
}