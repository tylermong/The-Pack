// src/programs/programs.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dtos/createProgram.dto';
import { CreateDayDto } from './dtos/createDay.dto';
import { CreateWeekDto } from './dtos/createWeek.dto';
import { CreateExerciseDto } from './dtos/createExercise.dto';
import { Programs } from '@prisma/client';
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { UpdateDayDto } from './dtos/updateDay.dto';
import { UpdateWeekDto } from './dtos/updateWeek.dto';
import { UpdateExerciseDto } from './dtos/updateExercise.dto';
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

@Patch('update/program/:programId')
async updateProgram(
  @Param('programId') programId: string, 
  @Body() updateProgramDto: UpdateProgramDto
) {
  // Assign the programId from the URL to the DTO
  updateProgramDto.programId = programId;

  // Now pass the DTO directly to the service method
  return this.programsService.updateProgram(updateProgramDto);
}
  
  @Patch('update/week/:weekId')
  async updateProgramWeek(
    @Param('weekId') weekId: string,  
    @Body() updateWeekDto: UpdateWeekDto
  ) {
    return this.programsService.updateProgramWeek({ ...updateWeekDto, programId: weekId });
  }

  @Patch('update/day/:dayId')
  async updateProgramDay(
    @Param('dayId') dayId: string,  
    @Body() updateDayDto: UpdateDayDto
  ) {
    return this.programsService.updateProgramDay({ ...updateDayDto, dayId });
  }

  @Patch('update/exercise/:exerciseId')
  async updateExercise(
    @Param('exerciseId') exerciseId: string,  
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.programsService.updateExercise({ ...updateExerciseDto, exerciseId });
  }

  
  @Get('all')
  async getAllPrograms() {
    return this.programsService.getAllPrograms();
  }

  // GET endpoint to fetch all weeks
  @Get('weeks')
  async getAllWeeks() {
    return this.programsService.getAllWeeks();
  }

  // GET endpoint to fetch all days
  @Get('days')
  async getAllDays() {
    return this.programsService.getAllDays();
  }

  // GET endpoint to fetch all exercises
  @Get('exercises')
  async getAllExercises() {
    return this.programsService.getAllExercises();
  }

}