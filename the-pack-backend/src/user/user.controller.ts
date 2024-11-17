import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
  //   return this.userService.update(id, updateUserDto);
  // }

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

  
}
