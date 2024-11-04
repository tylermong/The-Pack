import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CoachService } from 'src/coach/coach.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, CoachService, PrismaService, JwtService]
})
export class AuthModule {}