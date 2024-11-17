import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CoachService } from './coach.service';
import { Prisma, Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  create(@Body('id') id: string, @Body() createCoachDto: Prisma.UserCreateInput) {
    return this.coachService.createCoachWKey(id, createCoachDto);
  }

}