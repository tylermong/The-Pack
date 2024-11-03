import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NutritionTrackerService } from './nutritionTracker.service';
@Module({

    imports: [PrismaModule],
    controllers: [NutritionTrackerModule],
    providers: [NutritionTrackerService, PrismaService]
})
export class NutritionTrackerModule {}
