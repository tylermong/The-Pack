import { Controller, Get, Put, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGaurd } from 'src/auth/guards/roles.gaurd';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: 'CLIENT' | 'ADMIN' | 'COACH') {
    return this.userService.findAll(role);
  }

  //@UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  //Get client by client name
  @Get('client/:name')
  async getClientByName(@Param('name') name: string) {
      return this.userService.getClientByName(name);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
  //   return this.userService.update(id, updateUserDto);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
      return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  async updatePassword(@Param('id') id: string, @Body() updateData: { password: string }) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      return this.userService.updatePassword(id, hashedPassword);
  }

  //@Roles(Role.ADMIN)
  //@UseGuards(RolesGaurd)
  //@UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


  // @Get(':id')
  // async getUser(@Param('id') id: string, @Request() req) {
  //     // Verify requesting user matches the profile ID
  //     if (req.user.sub !== id) {
  //         throw new UnauthorizedException();
  //     }
  //     return this.userService.findOne(id);
  // }

  //Add class to user
  @Post(':id/class')
  async addClassToUser(@Param('id') userId: string, @Body() { classId }: { classId: string }) {
      return this.userService.addClassToUser(userId, classId);
  }

  //Remove class from user
  @Delete(':id/class/:classId')
  async removeClassFromUser(@Param('id') userId: string, @Param('classId') classId: string) {
      return this.userService.removeClassFromUser(userId, classId);
  }

  //Get clients by their coach
  @Get('coach/:coachId')
  async getClientsByCoach(@Param('coachId') coachId: string) {
      return this.userService.getClientsByCoach(coachId);
  }


  
}
