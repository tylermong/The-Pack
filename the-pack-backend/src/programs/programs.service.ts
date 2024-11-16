
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

 
 async updateProgram(updateProgramDto: UpdateProgramDto) {
    const { programId, programName } = updateProgramDto;
  
    
    return this.prisma.programs.update({
      where: { id: programId },  
      data: {
        programName,  
      },
    });
}
  async updateProgramWeek(updateWeekDto: UpdateWeekDto) {
    const { programId, numOfWeeks } = updateWeekDto;

    return this.prisma.programWeeks.update({
      where: { id: programId },
      data: {
        numOfWeeks,  
      },
    });
  }

  async updateProgramDay(updateDayDto: UpdateDayDto) {
    const { dayId, name } = updateDayDto;

    return this.prisma.programDays.update({
      where: { id: dayId },
      data: {
        name,  
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
    return this.prisma.programs.findMany();  
  }

  async getAllWeeks() {
    return this.prisma.programWeeks.findMany();  
  }

  async getAllDays() {
    return this.prisma.programDays.findMany();  
  }

  async getAllExercises() {
    return this.prisma.dailyExercise.findMany();  
  }


  async findAll() {
    return this.prisma.programs.findMany(); 
  }


  async findOne(id: string){
    return this.prisma.programs.findUnique({
      where: { id },
    });
  }

  async deleteExercise(exerciseId: string) {
    return this.prisma.dailyExercise.delete({
      where: { id: exerciseId },
    });
  }

  async deleteDay(dayId: string) {
    await this.prisma.dailyExercise.deleteMany({
      where: { dayNum: dayId },
    });

    return this.prisma.programDays.delete({
      where: { id: dayId },
    });
  }

  async deleteWeek(weekId: string) {
    await this.prisma.programDays.deleteMany({
      where: { weekNum: weekId },
    });

    return this.prisma.programWeeks.delete({
      where: { id: weekId },
    });
  }

  async deleteProgram(programId: string) {
    await this.prisma.programWeeks.deleteMany({
      where: { programId },
    });

    return this.prisma.programs.delete({
      where: { id: programId },
    });
  }

  async delete(id: string) {
    // Delete program and all related data
    const program = await this.findOne(id); // Retrieve program details

    if (program) {
      await this.deleteProgram(id);
      return { message: 'Program and all related data deleted successfully' };
    } else {
      throw new Error('Program not found');
    }

  }
}