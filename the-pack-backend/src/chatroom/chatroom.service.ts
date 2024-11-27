import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ChatroomService {
  constructor (private prismaService: PrismaService) {}

  async createChatroom(coachId: string, data: Prisma.ChatroomCreateWithoutCoachInput) {
    return this.prismaService.chatroom.create({
      data: {

        coachId,
        ...data

      }})
  }

  findAll() {
    return this.prismaService.chatroom.findMany();
  }

  findOne(id: string) {
    return this.prismaService.chatroom.findUnique({
      where: {id}
    });  }

  async updateChatroom(id: string, updateChatroomDto: Prisma.ChatroomUpdateInput) {

    const existingID = await this.prismaService.chatroom.findUnique({
      where: {id},
    });
    
    if(!existingID){
      throw new Error('Chatroom with ID not found')
    }
    return this.prismaService.chatroom.update({
      where: {id},
      data: updateChatroomDto
    })

  }

  remove(id: string) {

    return this.prismaService.chatroom.delete({
      where: {id},
    })

  }

  async findByCoach(coachId: string){
    return this.prismaService.chatroom.findMany({
      where: {coachId},
    })
  }

  async getUsersChatroom(userId: string) {
    return this.prismaService.chatroomParticipants.findMany({
        where: { userID: userId },
        include: {
            chatroom: true, // Include class details
        },
    });
  }

}
