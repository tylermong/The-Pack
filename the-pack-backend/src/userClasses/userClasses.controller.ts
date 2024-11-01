import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { userClassesService } from './userClasses.service';
import { Prisma } from '@prisma/client';


@Controller('userClasses')
export class userClassesController {
    constructor(private readonly userClassesService: userClassesService) {}
    
    @Get(':userId')
    async getUserClasses(@Param('userId') userId: string) {
        return this.userClassesService.getUserClasses(userId);
    }
    @Post('join')
    async join(@Body() body: { userId: string; classId: string }) {
        const { userId, classId } = body;
        return this.userClassesService.joinClass(userId, classId);
    }
    @Delete('leave')
    async leave(@Body() body: { userId: string; classId: string }) {
        const { userId, classId } = body;
        return this.userClassesService.leaveClass(userId, classId);
    }
}