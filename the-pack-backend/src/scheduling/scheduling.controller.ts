import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { schedulingService } from './scheduling.service';
import { Prisma } from '@prisma/client';


@Controller('scheduling')
export class SchedulingController {
    constructor(private schedulingService: schedulingService) {}

    @Post()
    async scheduleAppointment(@Body() body: { clientId: string; coachId: string; timeSlot: string, date: Date}) {
        return this.schedulingService.scheduleAppointment(body.clientId, body.coachId, body.timeSlot, body.date);
    }

    @Delete(':id')
    async cancelAppointment(@Param('id') appointmentId: string) {
        return this.schedulingService.cancelAppointment(appointmentId);
    }

    @Patch(':id')
    async modifyAppointment(@Param('id') appointmentId: string, @Body() data: { clientId?: string; coachId?: string; timeSlot?: string }) {
        return this.schedulingService.modifyAppointment(appointmentId, data);
    }

    @Get('user/:userId')
    async getUserAppointments(@Param('userId') userId: string) {
        return this.schedulingService.getUserAppointments(userId);
    }
    @Get('coach/:coachId')
    async getCoachAppointments(@Param('coachId') coachId: string) {
        return this.schedulingService.getCoachAppointments(coachId);
    }
    @Get()
    async getAllAppointments() {
        return this.schedulingService.getAllAppointments();
    }
}