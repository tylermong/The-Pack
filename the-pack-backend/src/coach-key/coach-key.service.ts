import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CoachKeyService {
  constructor (private prismaService: PrismaService) {}

  async createKey(data: Prisma.CoachKeyCreateInput) {
    return this.prismaService.coachKey.create({data});
  }

  async findAll() {
    return this.prismaService.coachKey.findMany();
  }

  
  async findOne(id: string) {
    return this.prismaService.coachKey.findUnique({
      where:{
        
        id: id,

      }
    });
  }
  

  remove(id: string) {
    return this.prismaService.coachKey.delete({
      where:{
        id,
      }
    });  }
}
