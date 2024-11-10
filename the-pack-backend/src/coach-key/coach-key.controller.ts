import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachKeyService } from './coach-key.service';
import { Prisma } from '@prisma/client';


@Controller('coach-key')
export class CoachKeyController {
  constructor(private readonly coachKeyService: CoachKeyService) {}

  @Post()
  create(@Body() data: Prisma.CoachKeyCreateInput) {
    return this.coachKeyService.createKey(data);
  }

  @Get()
  findAll() {
    return this.coachKeyService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') key: string) {
    return this.coachKeyService.findOne(key);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachKeyService.remove(id);
  }
}
