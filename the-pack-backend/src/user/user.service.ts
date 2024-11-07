import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor (private prismaSerivce: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput ) {
    return this.prismaSerivce.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      }
    });
  }

  async findAll(role?: 'CLIENT' | 'COACH' | 'ADMIN') {
    if (role) return this.prismaSerivce.user.findMany({
      where: {
        role,
      }
    })
    return this.prismaSerivce.user.findMany()
  }

  async findOne(id: string) {
    return this.prismaSerivce.user.findUnique({
      where:{
        id: id,
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
  }

  async remove(id: string) {
    return this.prismaSerivce.user.delete({
      where:{
        id,
      }
    });
  }

  async findByEmail(email: string){
    return await this.prismaSerivce.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async assignCoachToClient(clientId: string, coachId: string) {
    return await this.prismaSerivce.user.update({
      where: { id: clientId },
      data: { coach: { connect: { id: coachId } } },
    });
  }
  async getClientNutritionEntries(clientId: string, coachId: string) {
    // Verify the client-coach relationship
    const client = await this.prismaSerivce.user.findUnique({
      where: { id: clientId },
      select: { coachId: true },
    });
  
    if (client?.coachId !== coachId) {
      throw new Error("Unauthorized access: You are not the assigned coach for this client.");
    }
  
    // Retrieve client's nutrition entries
    return await this.prismaSerivce.nutritionTracker.findMany({
      where: { userId: clientId },
    });
  }
  async getClientExerciseEntries(clientId: string, coachId: string) {
    // Verify the client-coach relationship
    const client = await this.prismaSerivce.user.findUnique({
      where: { id: clientId },
      select: { coachId: true },
    });
  
    if (client?.coachId !== coachId) {
      throw new Error("Unauthorized access: You are not the assigned coach for this client.");
    }
  
    // Retrieve client's nutrition entries
    return await this.prismaSerivce.ExerciseTracker.findMany({
      where: { userId: clientId },
    });
  }
  
}