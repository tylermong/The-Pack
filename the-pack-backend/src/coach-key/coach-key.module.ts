import { Module } from '@nestjs/common';
import { CoachKeyService } from './coach-key.service';
import { CoachKeyController } from './coach-key.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CoachKeyController],
  providers: [CoachKeyService, PrismaService],
})
export class CoachKeyModule {}
