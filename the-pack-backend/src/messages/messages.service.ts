import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor (private prismaService: PrismaService) {}

  async create(userID: string, data: Prisma.MessagesCreateWithoutUserInput) {
    return this.prismaService.messages.create({
      data: {

        userID,
        ...data

      }
    })  
  }

  findAll() {
    return this.prismaService.messages.findMany();
  }

  findOne(id: string) {
    return this.prismaService.messages.findUnique({
      where: {id}
    });
  }

  async update(id: string, updateMessagesDto: Prisma.MessagesUpdateInput) {

    const existingID = await this.prismaService.messages.findUnique({
      where: {id},
    });
    
    if(!existingID){
      throw new Error('Chatroom with ID not found')
    }
    return this.prismaService.messages.update({
      where: {id},
      data: updateMessagesDto
    })

    }

  remove(id: string) {
    return this.prismaService.messages.delete({
      where: {id}
    })  
  }
}
