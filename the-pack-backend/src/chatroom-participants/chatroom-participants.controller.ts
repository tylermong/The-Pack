import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatroomParticipantsService } from './chatroom-participants.service';


@Controller('chatroom-participants')
export class ChatroomParticipantsController {
  constructor(private readonly chatroomParticipantsService: ChatroomParticipantsService) {}

  @Get(':userId')
  async getUsersChatroom(@Param('userId') userId: string) {
      return this.chatroomParticipantsService.getUsersChatroom(userId);
  }

  @Post('join')
  async join(@Body() body: { userId: string; chatroomId: string }) {
      const { userId, chatroomId } = body;
      return this.chatroomParticipantsService.joinChatroom(userId, chatroomId);
  }

  @Delete('leave')
  async leave(@Body() body: { userId: string; chatroomId: string }) {
      const { userId, chatroomId } = body;
      return this.chatroomParticipantsService.leaveChatroom(userId, chatroomId);
  }

  //Add multiple users to a chatroom
    @Post('join-multiple')
    async joinMultiple(@Body() body: { userIds: string[]; chatroomId: string }) {
        const { userIds, chatroomId } = body;
        if (!userIds || !Array.isArray(userIds)) {
            throw new Error('userIds must be a non-empty array');
        }
        const responses = await Promise.all(userIds.map((userId) => this.chatroomParticipantsService.joinChatroom(userId, chatroomId)));
        console.log("Added users: ",responses);
        return responses;
    }

  
}
