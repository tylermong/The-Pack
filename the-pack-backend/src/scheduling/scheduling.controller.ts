import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { schedulingService } from './scheduling.service';
import { Prisma } from '@prisma/client';


@Controller('scheduling')
export class SchedulingController {}