import { Module } from '@nestjs/common';
import { ChatroomParticipantsService } from './chatroom-participants.service';
import { ChatroomParticipantsController } from './chatroom-participants.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatroomParticipantsController],
  providers: [ChatroomParticipantsService, PrismaService],
})
export class ChatroomParticipantsModule {}
