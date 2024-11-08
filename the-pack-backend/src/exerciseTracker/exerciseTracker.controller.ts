import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseTrackerService } from './exerciseTracker.service';
import { Prisma } from '@prisma/client';
import { CreateExerciseTrackerDto } from './dtos/CreateExerciseTracker.dto';

@Controller('exerciseTracker')
export class ExerciseTrackerController{
    constructor(private readonly exerciseTrackerService:ExerciseTrackerService){}
    
    @Post()
    async createExercise(@Body() CreateExerciseTrackerDto: CreateExerciseTrackerDto){
        return await this.exerciseTrackerService.createUserExerciseEntry(CreateExerciseTrackerDto)
    }
}