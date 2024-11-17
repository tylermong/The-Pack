import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CoachService } from 'src/coach/coach.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CoachKeyService } from 'src/coach-key/coach-key.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private coachService: CoachService, private userService: UserService, private coachKeyService: CoachKeyService) {}

  @Post('createCoach')
  createCoach(@Body() createCoachDto: Prisma.UserCreateInput) {
    return this.coachService.createCoach(createCoachDto);
  }

  @Get('findAll')
  findAll(@Query('role') role?: 'CLIENT' | 'ADMIN' | 'COACH') {
    return this.userService.findAll(role);
  }

  @Post('coachKey')
  createCoachKey(@Body() data: Prisma.CoachKeyCreateInput) {
    return this.coachKeyService.createKey(data);
  }

}
