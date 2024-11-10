
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateProgramDto } from './dtos/createProgram.dto';
import { CreateWeekDto } from './dtos/createWeek.dto';
import { CreateDayDto } from './dtos/createDay.dto';
import { CreateExerciseDto } from './dtos/createExercise.dto';
import { Programs } from '@prisma/client'; 
import { UpdateProgramDto } from './dtos/updateProgram.dto';

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
      where: { id: programId },
      data: {
        programName,  // Only the programName is updated here, it can be optional
      },
    });
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
