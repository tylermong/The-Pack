import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { classesService } from './classes.service';
import { Prisma } from '@prisma/client';


@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: classesService) {}

    

    @Post()
    async create(@Body() { creatorId, ...classData }: { creatorId: string } & Prisma.classesCreateInput) {
        return this.classesService.createClass(creatorId, classData);
    }
    @Get()
    async getClasses() {
        return this.classesService.getAllClasses();
    }
    @Get(':id')
    async getClassById(@Param('id') id: string) {
        return this.classesService.getClassById(id);
    }

    @Delete(':id')
    async delete(@Param('id') classId: string) {
        return this.classesService.deleteClass(classId);
    }
    @Patch(':id')
    async update(@Param('id') classId: string, @Body() classData: Prisma.classesUpdateInput) {
        return this.classesService.updateClass(classId, classData);
    }
}