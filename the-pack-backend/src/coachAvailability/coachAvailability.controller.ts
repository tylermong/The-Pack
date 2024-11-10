// coach-availability.controller.ts
import { Controller, Post, Get, Delete, Put, Body, Param } from '@nestjs/common';
import { CoachAvailabilityService } from './coachAvailability.service';

@Controller('coachAvailability')
export class CoachAvailabilityController {
  constructor(private readonly coachAvailabilityService: CoachAvailabilityService) {}

  // Create a new availability slot for a coach
  @Post()
  async createAvailability(
    @Body('coachId') coachId: string,
    @Body('timeSlot') timeSlot: string,
    @Body('date') date: Date,

  ) {
    return this.coachAvailabilityService.createAvailability(coachId, timeSlot, date);
  }

  @Get()
  async getAllAvailabilities() {
    return this.coachAvailabilityService.getAllAvailabilities();
  }

  @Get(':coachId')
  async getAvailabilityByCoach(@Param('coachId') coachId: string) {
    return this.coachAvailabilityService.getAvailabilityByCoach(coachId);
  }

  @Delete(':id')
  async deleteAvailability(@Param('id') availabilityId: string) {
    return this.coachAvailabilityService.deleteAvailability(availabilityId);
  }

  @Put(':id')
  async updateAvailability(
    @Param('id') availabilityId: string,
    @Body('timeSlot') newTimeSlot: string
  ) {
    return this.coachAvailabilityService.updateAvailability(availabilityId, newTimeSlot);
  }
}
