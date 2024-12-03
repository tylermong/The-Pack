// src/programs/programs.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dtos/createProgram.dto';

import { Programs } from '@prisma/client';
import { UpdateProgramDto } from './dtos/updateProgram.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {} 

  
  @Post()
  async create(@Body() createProgramDto: CreateProgramDto){
    return this.programsService.create(createProgramDto); 
  }

  //LOOK SOMETING LIKE THIS CHANGE THE CREATEPROGRAMDTO TO HAVE: id: string,  name: string, description: string, tags: string[]
  // @Post(':id')
  // async createProgram(@Param('id') id: string, @Body() createProgramDto: CreateProgramDto){ 
  //   return this.programsService.createProgram({ ...createProgramDto, id });
  // }


  
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

  
  @Get() // Changed from @Get('all') to @Get()
  async getAllPrograms() { 
    return this.programsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Delete(':id')
  async deleteProgram(@Param('id') id: string) {
    const result = await this.programsService.deleteProgram(id);
  
    if (result) {
      return { message: 'Program and all related data deleted successfully' };
    } else {
      return { message: 'Program not found or deletion failed' };
    }
  }
}