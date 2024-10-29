import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachService } from './coach.service';
import { Prisma } from '@prisma/client';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  create(@Body() createCoachDto: Prisma.CoachCreateInput) {
    return this.coachService.create(createCoachDto);
  }

  @Get()
  findAll() {
    return this.coachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: Prisma.CoachUpdateInput) {
    return this.coachService.update(id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(id);
  }
}