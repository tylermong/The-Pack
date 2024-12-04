import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateProgramDto } from './dtos/createProgram.dto';
import { UpdateProgramDto } from './dtos/updateProgram.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {} 


  async create(createProgramDto: CreateProgramDto){
    const {programDecription, userId } = createProgramDto;

    return this.prisma.programs.create({
      data: {
        programDescription: programDecription,
        userId: userId,
      },
    });
  }
 
 async updateProgram(updateProgramDto: UpdateProgramDto) {
    const { userId, programDescription } = updateProgramDto;
  
    // Find the program by userId first
    const existingProgram = await this.prisma.programs.findFirst({
      where: { userId }
    });

    if (!existingProgram) {
      throw new Error('Program not found for this user');
    }

    // Update using the program's actual id
    return this.prisma.programs.update({
      where: { id: existingProgram.id },  // Use the actual program id
      data: {
        programDescription
      }
    });
}

  async findAll() {
    return this.prisma.programs.findMany(); 
  }


  async findOne(userId: string) {
    return this.prisma.programs.findFirst({
      where: { userId },
    });
  }


  async deleteProgram(id: string) {
    
    return this.prisma.programs.delete({
      where: {id},
    });

  }

}