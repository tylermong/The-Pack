import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoachService } from 'src/coach/coach.service';
import { UserService } from 'src/user/user.service';
import { CoachKeyService } from 'src/coach-key/coach-key.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtService, PrismaService, CoachService, CoachKeyService, UserService],
})
export class AdminModule {}
