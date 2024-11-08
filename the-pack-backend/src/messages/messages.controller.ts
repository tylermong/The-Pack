import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessagesDto } from './dto/create-message.dto';
import { UpdateMessagesDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() {userID, ...createMessageDto}: CreateMessagesDto) {
    return this.messagesService.create(userID, createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessagesDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
