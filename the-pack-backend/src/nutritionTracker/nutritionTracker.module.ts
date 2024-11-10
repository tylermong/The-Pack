import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NutritionTrackerService } from './nutritionTracker.service';
import { NutritionTrackerController } from './nutritionTracker.controller';
@Module({

    imports: [PrismaModule],
    controllers: [NutritionTrackerController],
    providers: [NutritionTrackerService, PrismaService]
})
export class NutritionTrackerModule {}
