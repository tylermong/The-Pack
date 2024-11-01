import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { classesService } from './classes.service';
import { Prisma } from '@prisma/client';


@Controller('classes')
export class ClassesController {}