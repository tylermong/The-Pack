import { Module } from '@nestjs/common';
import { schedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchedulingController],
  providers: [schedulingService],
})

export class schedulingModule {}