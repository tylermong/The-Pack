import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseTrackerService } from './userExerciseTracker.service';
import { Prisma } from '@prisma/client';

@Controller('exerciseTracker')
export class ExerciseTrackerController{
    constructor(private readonly exerciseTrackerService:ExerciseTrackerService){}
}