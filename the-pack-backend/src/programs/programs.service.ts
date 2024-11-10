
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateProgramDto } from './dtos/createProgram.dto';
import { CreateWeekDto } from './dtos/createWeek.dto';
import { CreateDayDto } from './dtos/createDay.dto';
import { CreateExerciseDto } from './dtos/createExercise.dto';
import { Programs } from '@prisma/client'; 
import { UpdateProgramDto } from './dtos/updateProgram.dto';
import { UpdateWeekDto } from './dtos/updateWeek.dto';
import { UpdateDayDto } from './dtos/updateDay.dto';
import { UpdateExerciseDto } from './dtos/updateExercise.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {} 


  async create(createProgramDto: CreateProgramDto){
    const { programName, userId } = createProgramDto;

    return this.prisma.programs.create({
      data: {
        programName,
        userId,
      },
    });
  }
  async createWeek(createWeekDto:CreateWeekDto){
    const{ numOfWeeks, programId} = createWeekDto
    return this.prisma.programWeeks.create({
        data: {
            numOfWeeks,
            programId
        }
    })
  }
async createDay(createDayDto:CreateDayDto){
    const{name, weekId} = createDayDto

    return this.prisma.programDays.create({
        data:{
            name,
            weekNum: weekId,
        }
    })
}

async createExercise(createExerciseDto: CreateExerciseDto){
    const { exerciseName, numOfSets, numOfReps, weightLifted, dayId } = createExerciseDto;
    return this.prisma.dailyExercise.create({
        data:{
            exerciseName, 
            numOfSets, 
            numOfReps, 
            weightLifted, 
            dayNum: dayId
        }
    })
}

 // Update Program
 async updateProgram(updateProgramDto: UpdateProgramDto) {
    const { programId, programName } = updateProgramDto;
  
    // Update program
    return this.prisma.programs.update({
      where: { id: programId },  // Use the programId to find the record
      data: {
        programName,  // Update programName if it's provided
      },
    });
}
  async updateProgramWeek(updateWeekDto: UpdateWeekDto) {
    const { programId, numOfWeeks } = updateWeekDto;

    return this.prisma.programWeeks.update({
      where: { id: programId },
      data: {
        numOfWeeks,  // Update number of weeks if provided
      },
    });
  }

  async updateProgramDay(updateDayDto: UpdateDayDto) {
    const { dayId, name } = updateDayDto;

    return this.prisma.programDays.update({
      where: { id: dayId },
      data: {
        name,  // Update program day name if provided
      },
    });
  }
  async updateExercise(updateExerciseDto: UpdateExerciseDto) {
    const { exerciseId, exerciseName, numOfSets, numOfReps, weightLifted } = updateExerciseDto;

    return this.prisma.dailyExercise.update({
      where: { id: exerciseId },  
      data: {
        exerciseName,  
        numOfSets,    
        numOfReps,     
        weightLifted,  
      },
    });
  }

  async getAllPrograms() {
    return this.prisma.programs.findMany();  // Get all programs
  }

  // Method to get all weeks
  async getAllWeeks() {
    return this.prisma.programWeeks.findMany();  // Get all weeks
  }

  // Method to get all days
  async getAllDays() {
    return this.prisma.programDays.findMany();  // Get all days
  }

  // Method to get all exercises
  async getAllExercises() {
    return this.prisma.dailyExercise.findMany();  // Get all exercises
  }


  async findAll() {
    return this.prisma.programs.findMany(); 
  }


  async findOne(id: string){
    return this.prisma.programs.findUnique({
      where: { id },
    });
  }
}
