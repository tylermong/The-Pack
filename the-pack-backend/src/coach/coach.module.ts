import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoachKeyService } from 'src/coach-key/coach-key.service';

@Module({
  imports: [PrismaModule],
  controllers: [CoachController],
  providers: [CoachService, JwtService, PrismaService, CoachKeyService],
})

export class CoachModule {}