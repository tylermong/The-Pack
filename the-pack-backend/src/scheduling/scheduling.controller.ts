import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { schedulingService } from './scheduling.service';
import { CreateAppointmentDto } from './dtos/createAppointment.dto';

@Controller('appointments') // Base route for scheduling endpoints
export class SchedulingController {
  constructor(private readonly schedulingService: schedulingService) {}

  // Schedule an appointment
  @Post('schedule')
  async scheduleAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto
  ) {
    await this.schedulingService.scheduleAppointment(createAppointmentDto);
  }

  // Cancel an appointment
  @Delete(':appointmentId')
  async cancelAppointment(
    @Param('appointmentId') appointmentId: string
  ) {
    await this.schedulingService.cancelAppointment(appointmentId);
  }

  // Get appointments for a user (client)
  @Get('user/:userId')
  async getUserAppointments(
    @Param('userId') userId: string
  ) {
    return await this.schedulingService.getUserAppointments(userId);
  }

  // Get appointments for a coach
  @Get('coach/:coachId')
  async getCoachAppointments(
    @Param('coachId') coachId: string
  ) {
    return await this.schedulingService.getCoachAppointments(coachId);
  }

  // Get all appointments (admin, or for all users)
  @Get()
  async getAllAppointments() {
    return await this.schedulingService.getAllAppointments();
  }

  // Modify an appointment
  @Patch(':appointmentId')
  async modifyAppointment(
    @Param('appointmentId') appointmentId: string,
    @Body() updateAppointmentDto: CreateAppointmentDto
  ) {
    return await this.schedulingService.modifyAppointment(appointmentId, updateAppointmentDto);
  }
}
