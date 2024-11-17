import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TimeSlotService } from './timeslot.service';
import { CreateTimeSlotDto } from './dtos/createTimeSlot.dto';

@Controller('timeslots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  // Get time slot by ID
  @Get(':timeSlotId')
  async getTimeSlot(@Param('timeSlotId') timeSlotId: string) {
    return this.timeSlotService.getTimeSlotById(timeSlotId);
  }

  @Post()
  async createTimeSlot(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotService.createTimeSlot(createTimeSlotDto);
  }

  // Get all time slots for a coach
  @Get('coach/:availabilityId')
  async getCoachTimeSlots(@Param('availabilityId') availabilityId: string) {
    return this.timeSlotService.getCoachTimeSlots(availabilityId);
  }
}
