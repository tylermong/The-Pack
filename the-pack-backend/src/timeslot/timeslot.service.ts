import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimeSlot } from '@prisma/client';  // Import the Prisma TimeSlot model
import { CreateTimeSlotDto } from './dtos/createTimeSlot.dto';

@Injectable()
export class TimeSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getTimeSlotById(timeSlotId: string): Promise<TimeSlot> {
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    return timeSlot;
  }

  async createTimeSlot(createTimeSlotDto: CreateTimeSlotDto){
    const { startTime, endTime, availabilityId } = createTimeSlotDto;

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const timeSlot = await this.prisma.timeSlot.create({
      data: {
        startTime: startDate,
        endTime: endDate,
        availabilityId: availabilityId,
      },
    });

    return timeSlot;
  }

  async updateTimeSlotStatus(timeSlotId: string, isBooked: boolean): Promise<TimeSlot> {
    const timeSlot = await this.prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { isBooked },
    });

    return timeSlot;
  }

  async getCoachTimeSlots(availabilityId: string) {
    return this.prisma.timeSlot.findMany({
      where: { availabilityId },
    });
  }
}
