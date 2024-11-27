import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessagesDto } from './dto/create-message.dto';
import { UpdateMessagesDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() { userID, chatroomId, content }: CreateMessagesDto) {
    return this.messagesService.create(userID, { content, chatroomId });
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessagesDto) {
    const { content, chatroomId } = updateMessageDto;
    return this.messagesService.update(id, { content, chatroomId });
  }

  // //Return all messages in a chatroom
  // @Get('chatroom/:chatroomId')
  // async getMessagesInChatroom(@Param('chatroomId') chatroomId: string) {
  //   return this.messagesService.getMessagesInChatroom(chatroomId);
  // }
}
