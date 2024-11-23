// coach-availability.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is set up correctly
import { coachAvailability } from '@prisma/client';
import { CreateAvailabilityDto } from './dtos/createCoachAvailability.dto';
import { UpdateAvailabilityDto } from './dtos/updateCoachAvailability.dto';

@Injectable()
export class CoachAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new coach availability
  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    const { coachId, date, timeSlots } = createAvailabilityDto;

    // Create the availability record and associated time slots
    return this.prisma.coachAvailability.create({
      data: {
        coachId,
        date,
        timeSlots: {
          create: timeSlots.map(({ startTime, endTime }) => ({
            startTime,
            endTime,
            isBooked: false, // default value
          })),
        },
      },
      include: { timeSlots: true },
    });
  }

  async getAllAvailabilities(){
    return this.prisma.coachAvailability.findMany();
  }

  async getAllAvailabilitiesWithTimeSlots() {
    return this.prisma.coachAvailability.findMany({
      include: { timeSlots: true },
    });
  }

  async getAvailabilityWithTimeSlotsById(availabilityId: string) {
    const availability = await this.prisma.coachAvailability.findUnique({
      where: { id: availabilityId },
      include: { timeSlots: true },
    });

    if (!availability) {
      throw new Error('Availability not found');
    }

    return availability.timeSlots.map(slot => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));
  }

  // Get all availability slots for a particular coach
  async getAvailabilityByCoach(coachId: string) {
    return this.prisma.coachAvailability.findMany({
      where: { coachId },
    });
  }

  // Delete a coach's availability by ID
  async deleteAvailability(availabilityId: string) {
    return this.prisma.coachAvailability.delete({
      where: { id: availabilityId },
    });
  }

  async updateAvailability(
    availabilityId: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    // Directly update the coachAvailability record with provided fields
    return this.prisma.coachAvailability.update({
      where: { id: availabilityId },
      data: updateAvailabilityDto,
      include: { timeSlots: true }, // Optionally return updated timeSlots
    });
  }

}
