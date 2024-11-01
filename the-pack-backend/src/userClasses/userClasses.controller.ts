import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { userClassesService } from './userClasses.service';
import { Prisma } from '@prisma/client';


@Controller('scheduling')
export class userClassesController {}