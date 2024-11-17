import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TimeSlotController } from './timeslot.controller';
import { TimeSlotService } from './timeslot.service';
@Module({
  imports: [],
  providers: [TimeSlotService, PrismaService],
  controllers: [TimeSlotController],
})
export class TimeSlotModule {}
