// src/programs/programs.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
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

  @Patch('update/exercise/:exerciseId') // exerciseId in URL
  async updateExercise(
    @Param('exerciseId') exerciseId: string, // Get exerciseId from URL
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.programsService.updateExercise(exerciseId, updateExerciseDto);
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

  @Delete(':id')
  async deleteProgram(@Param('id') id: string) {
    const result = await this.programsService.delete(id);
    
    if (result) {
      return { message: 'Program and all related data deleted successfully' };
    } else {
      return { message: 'Program not found or deletion failed' };
    }
  }

  @Delete('exercise/:exerciseId')
  async deleteExercise(@Param('exerciseId') exerciseId: string) {
    const result = await this.programsService.deleteExercise(exerciseId);
    
    if (result) {
      return { message: 'Exercise deleted successfully' };
    } else {
      return { message: 'Exercise not found or deletion failed' };
    }
  }

  @Delete('day/:dayId')
  async deleteDay(@Param('dayId') dayId: string) {
    const result = await this.programsService.deleteDay(dayId);
    
    if (result) {
      return { message: 'Day deleted successfully' };
    } else {
      return { message: 'Day not found or deletion failed' };
    }
  }

  @Delete('week/:weekId')
  async deleteWeek(@Param('weekId') weekId: string) {
    const result = await this.programsService.deleteWeek(weekId);
    
    if (result) {
      return { message: 'Week deleted successfully' };
    } else {
      return { message: 'Week not found or deletion failed' };
    }
  }

}