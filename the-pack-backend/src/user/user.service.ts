import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor (private prismaSerivce: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput ) {
    return this.prismaSerivce.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email, 
        password: createUserDto.password,
        usersCoach: createUserDto.usersCoach,
      }
    });
  }

  // async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
  //   if (role) return this.prismaSerivce.user.findMany({
  //     where: {
  //       role,
  //     }
  //   })
  //   return this.prismaSerivce.user.findMany()
  // }

  async findOne(id: string) {
    return this.prismaSerivce.user.findUnique({
      where:{
        id,
      }
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prismaSerivce.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    })

    //test

  }

  async remove(id: string) {
    return this.prismaSerivce.user.delete({
      where:{
        id,
      
      }
    });
  }
}
