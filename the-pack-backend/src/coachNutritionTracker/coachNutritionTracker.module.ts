import { Module } from '@nestjs/common';
import { CoachNutritionTrackerController } from './coachNutritionTracker.controller';
import { CoachNutritionTrackerService } from './coachNutritionTracker.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
    imports: [PrismaModule],
    controllers: [CoachNutritionTrackerController],
    providers: [CoachNutritionTrackerService, PrismaService]
})
export class CoachNutritionTrackerModule {}
