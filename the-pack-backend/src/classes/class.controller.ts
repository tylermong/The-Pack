
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { Prisma } from '@prisma/client';


@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    

    @Post()
    async create(@Body() { creatorId, ...classData }: { creatorId: string } & Prisma.ClassCreateInput) {
        return this.classService.createClass(creatorId, classData);
    }
    @Get()
    async getClass() {
        return this.classService.getAllClass();
    }
    @Get(':id')
    async getClassById(@Param('id') id: string) {
        return this.classService.getClassById(id);
    }

    @Delete(':id')
    async delete(@Param('id') classId: string) {
        return this.classService.deleteClass(classId);
    }
    @Patch(':id')
    async update(@Param('id') classId: string, @Body() classData: Prisma.ClassUpdateInput) {
        return this.classService.updateClass(classId, classData);
    }
}