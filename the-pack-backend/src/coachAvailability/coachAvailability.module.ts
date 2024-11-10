// coach-availability.module.ts
import { Module } from '@nestjs/common';
import { CoachAvailabilityService } from './coachAvailability.service';
import { CoachAvailabilityController } from './coachAvailability.controller';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is set up correctly

@Module({
  providers: [CoachAvailabilityService, PrismaService],
  controllers: [CoachAvailabilityController],
})
export class CoachAvailabilityModule {}
