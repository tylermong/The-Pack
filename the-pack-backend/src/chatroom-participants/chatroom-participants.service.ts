import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ChatroomParticipantsService {
  constructor (private prismaService: PrismaService){}


  async getUsersChatroom(userId: string) {
    return this.prismaService.chatroomParticipants.findMany({
        where: { userID: userId },
        include: {
            chatroom: true, // Include class details
        },
    });
}

  async joinChatroom(userId: string, chatroomId: string): Promise<string> {

    const existingParticipant = await this.prismaService.chatroomParticipants.findUnique({
      where: {
        userID_chatroomID: { userID: userId, chatroomID: chatroomId },
      },
    });
    if (existingParticipant) {
      throw new Error('User is already in this chatroom');
    }

    await this.prismaService.chatroomParticipants.create({
      data: {
        userID: userId,
        chatroomID: chatroomId,
      },
    });
    
    return 'User successfully joined the chatroom';

  }


  async leaveChatroom(userId: string, classId: string) {
    
    await this.prismaService.chatroomParticipants.delete({
        where: {
            userID_chatroomID: { userID: userId, chatroomID: classId },
        },
    });

    return 'User successfully left the class';
}

//Add multiple users to a chatroom
async joinMultiple(userId: string[], chatroomId: string): Promise<string[]> {
  const responses = await Promise.all(userId.map((userId) => this.joinChatroom(userId, chatroomId)));
  return responses;
}
  
}
