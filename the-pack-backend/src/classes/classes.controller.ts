import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { classesService } from './classes.service';
import { Prisma } from '@prisma/client';


@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: classesService) {}

    @Post('join')
    async joinClass(@Body('userId') userId: string, @Body('classId') classId: string): Promise<string> {
    return this.classesService.joinClass(userId, classId);
    }
}