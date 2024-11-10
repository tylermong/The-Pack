// coach-availability.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is set up correctly
import { coachAvailability } from '@prisma/client';

@Injectable()
export class CoachAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new coach availability
  async createAvailability(coachId: string, timeSlot: string, date: Date): Promise<coachAvailability> {
    return this.prisma.coachAvailability.create({
      data: {
        coachId,
        timeSlot,
        date,
      },
    });
  }

  async getAllAvailabilities(): Promise<coachAvailability[]> {
    return this.prisma.coachAvailability.findMany();
  }

  // Get all availability slots for a particular coach
  async getAvailabilityByCoach(coachId: string): Promise<coachAvailability[]> {
    return this.prisma.coachAvailability.findMany({
      where: { coachId },
    });
  }

  // Delete a coach's availability by ID
  async deleteAvailability(availabilityId: string): Promise<coachAvailability> {
    return this.prisma.coachAvailability.delete({
      where: { id: availabilityId },
    });
  }

  // Update a coach's availability (timeSlot)
  async updateAvailability(availabilityId: string, newTimeSlot: string): Promise<coachAvailability> {
    return this.prisma.coachAvailability.update({
      where: { id: availabilityId },
      data: { timeSlot: newTimeSlot },
    });
  }
}
