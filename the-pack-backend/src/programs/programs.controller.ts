import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProgramService } from './programs.service';
import { CreateProgramDto } from './dtos/createProgram.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  findAll() {
    return this.programsService.findAll();
  }
}
