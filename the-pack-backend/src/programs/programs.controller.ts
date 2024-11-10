// src/programs/programs.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { CreateDayDto } from './dtos/createDay.dto';
import { CreateWeekDto } from './dtos/createWeek.dto';
import { CreateExerciseDto } from './dtos/createExercise.dto';
import { Programs } from '@prisma/client';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {} 

  
  @Post()
  async create(@Body() createProgramDto: CreateProgramDto){
    return this.programsService.create(createProgramDto); 
  }
  @Post('week')
  async createWeek(@Body() createWeekDto: CreateWeekDto){
    return this.programsService.createWeek(createWeekDto)
  }
  @Post('day')
  async createDay(@Body() createDayDto:CreateDayDto){
    return this.programsService.createDay(createDayDto)
  }
  @Post('exercise')
  async createExercise(@Body() createExerciseDto: CreateExerciseDto){
    return this.programsService.createExercise(createExerciseDto)
  }
  
  @Get()
  async findAll(){
    return this.programsService.findAll(); // Delegate to service
  }

  // Get program by ID
  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.programsService.findOne(id); // Delegate to service
  }
}
