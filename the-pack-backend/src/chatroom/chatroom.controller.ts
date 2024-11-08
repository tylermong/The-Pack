import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { Prisma } from '@prisma/client';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';


@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post()
  createChatroom(@Body() {coachId, ...createChatroomData}: CreateChatroomDto) {
    return this.chatroomService.createChatroom(coachId, createChatroomData);
  }

  @Get()
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(id);
  }

  @Patch(':id')
  updateChatroom(@Param('id') id: string, @Body() updateChatroomDto: UpdateChatroomDto) {
    return this.chatroomService.updateChatroom(id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(id);
  }

  @Get('coach/:coachId')
  findAnnouncementsByAuthor(@Param('coachId') coachId: string) {
    return this.chatroomService.findByCoach(coachId);
  }
}
