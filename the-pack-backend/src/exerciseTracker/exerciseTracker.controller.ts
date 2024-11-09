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
    @Get('user/:userId')
    async getUserExerciseDataForUser(@Param('userId') userId: string){
        return await this.exerciseTrackerService.getUserExerciseEntries(userId)
    }
    @Get('coach/:coachId/all')
    async getAllExerciseDataForCoach(@Param('coachId') coachId: string){
        return await this.exerciseTrackerService.getUserExerciseEntriesForCoach(coachId);
    }

    @Get('coach/:userId')
    async getUserExerciseEntryForCoach(@Param('userId') userId: string){
        return await this.exerciseTrackerService.getUserExerciseEntries(userId)
    }

    @Delete(':exerciseId')
    async deleteUserExerciseEntry(@Param('exerciseId') exerciseId: string){
        return await this.exerciseTrackerService.deleteUserExerciseEntry(exerciseId)
    }
}