import { Controller, Post, Get, Delete, Put, Body, Param } from '@nestjs/common';
import { CoachAvailabilityService } from './coachAvailability.service';
import { CreateAvailabilityDto } from './dtos/createCoachAvailability.dto';
import { UpdateAvailabilityDto } from './dtos/updateCoachAvailability.dto';
import { coachAvailability } from '@prisma/client';

@Controller('coachAvailability')
export class CoachAvailabilityController {
  constructor(private readonly coachAvailabilityService: CoachAvailabilityService) {}

  // Create a new availability slot for a coach
  @Post()
  async createAvailability(
    @Body() createAvailabilityDto: CreateAvailabilityDto,  // Use DTO to validate incoming data
  ){
    return this.coachAvailabilityService.createAvailability(createAvailabilityDto);
  }

  // Get all availabilities (for all coaches)
  @Get()
  async getAllAvailabilities(): Promise<coachAvailability[]> {
    return this.coachAvailabilityService.getAllAvailabilities();
  }

  // Get availability by coach ID
  @Get(':coachId')
  async getAvailabilityByCoach(
    @Param('coachId') coachId: string,  // Extract the coachId from the URL parameter
  ){
    return this.coachAvailabilityService.getAvailabilityByCoach(coachId);
  }

  // Delete an availability slot by its ID
  @Delete(':id')
  async deleteAvailability(
    @Param('id') availabilityId: string,  // Extract the availabilityId from the URL parameter
  ){
    return this.coachAvailabilityService.deleteAvailability(availabilityId);
  }

  // Update an existing availability slot
  @Put(':id')
  async updateAvailability(
    @Param('id') availabilityId: string,  // Extract the availabilityId from the URL parameter
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,  // Extract data to update from the body
  ){
    return this.coachAvailabilityService.updateAvailability(availabilityId, updateAvailabilityDto);
  }
}
