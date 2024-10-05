import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {DatabaseService} from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto
    })
  }

  async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
    return this.databaseService.user.findMany({
      where: {
        role,
      }
    })
    return this.databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
      id,
      },
      data: updateUserDto,
    })
  }

  async  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      }
    })
  }
}
