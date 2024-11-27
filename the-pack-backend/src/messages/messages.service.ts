import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor (private prismaService: PrismaService) {}

  async create(userID: string, data: { content: string; chatroomId: string }) {
    return this.prismaService.messages.create({
      data: {
        content: data.content,
        createdAt: new Date(),
        user: {
          connect: { id: userID }, // Connect the user
        },
        chatroomId: {
          connect: { id: data.chatroomId }, // Connect the chatroom
        },
      },
    });
  }

  findAll() {
    return this.prismaService.messages.findMany();
  }

  findOne(id: string) {
    return this.prismaService.messages.findUnique({
      where: {id}
    });
  }

  async update(messageId: string, data: { content?: string; chatroomId?: string }) {
    return this.prismaService.messages.update({
      where: { id: messageId },
      data: {
        content: data.content, // Update content if provided
        ...(data.chatroomId && {
          chatroom: {
            connect: { id: data.chatroomId }, // Connect the chatroom if provided
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prismaService.messages.delete({
      where: {id}
    })  
  }

  // //Return all messages in a chatroom
  // async getMessagesInChatroom(chatroomId: string) {
  //   return this.prismaService.messages.findMany({
  //     where: { chatroomId: chatroomId },
  //     include: {
  //       user: true, // Include user details
  //     },
  //   });
  // }
}
