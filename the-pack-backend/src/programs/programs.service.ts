
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
    const { programId, programDescription } = updateProgramDto;
  
    
    return this.prisma.programs.update({
      where: { id: programId },  
      data: {
        programDescription,  
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


  async deleteProgram(id: string) {
    
    return this.prisma.programs.delete({
      where: {id},
    });

  }

}