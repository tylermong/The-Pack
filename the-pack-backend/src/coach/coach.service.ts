import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CoachKeyService } from 'src/coach-key/coach-key.service';

@Injectable()
export class CoachService {
  constructor (private prismaSerivce: PrismaService, private coachKeyService: CoachKeyService) {}

  async create(id: string, createCoachDto: Prisma.UserCreateInput ) {

    const coachKey = await this.coachKeyService.findOne(id)

    if(!coachKey){
      throw new NotFoundException('Key does not exist');
    }

    await this.coachKeyService.remove(id)
    const { id: _, ...userData } = createCoachDto;

    return this.prismaSerivce.user.create({
      data:{ 
        ...userData,
        password: await hash(createCoachDto.password, 10),
        role: 'COACH'
      }
    });

  }

  //This is where the other coach functions are located

  /*

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
  */
}