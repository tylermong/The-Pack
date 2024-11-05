import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class CoachService {
  constructor (private prismaSerivce: PrismaService) {}

  async create(createCoachDto: Prisma.CoachCreateInput ) {
    return this.prismaSerivce.coach.create({
      data:{ 
        ...createCoachDto,
        password: await hash(createCoachDto.password, 10)
      }
    });
  }

  async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
    if (role) return this.prismaSerivce.coach.findMany({
      where: {
        role,
      }
    })
    return this.prismaSerivce.coach.findMany()
  }

  async findOne(id: string) {
    return this.prismaSerivce.coach.findUnique({
      where:{
        id,
      }
    });
  }

  async update(id: string, updateCoachDto: Prisma.CoachUpdateInput) {
    return this.prismaSerivce.coach.update({
      where: {
        id,
      },
      data: updateCoachDto,
    })
  }

  async remove(id: string) {
    return this.prismaSerivce.coach.delete({
      where:{
        id,
      }
    });
  }

  async findByEmail(email: string){
    return await this.prismaSerivce.coach.findUnique({
      where: {
        email: email,
      },
    });
  }
}