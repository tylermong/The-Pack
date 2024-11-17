import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CoachService } from 'src/coach/coach.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AdminService {
  constructor (private prismaSerivce: PrismaService, private coachService:CoachService) {}



}
