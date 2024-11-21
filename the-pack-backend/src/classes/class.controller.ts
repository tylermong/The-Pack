
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { Prisma } from '@prisma/client';
import { UpdateClassDto } from './dtos/updateClass.dto';
import { CreateClassDto } from './dtos/createClass.dto';


@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    

    @Post()
    async create(@Body() { creatorId, ...classData }: { creatorId: string } & CreateClassDto) {
        // Ensure that `assignedCoachId` and other required data are passed correctly
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
    async update(@Param('id') classId: string, @Body() classData: UpdateClassDto) {
        // Pass the classData to the service for update
        return this.classService.updateClass(classId, classData);
    }

    //Get classes by coach ID
    @Get('coach/:coachId')
    async getClassesByCoach(@Param('coachId') coachId: string) {
        return this.classService.getClassesByCoach(coachId);
    }
}