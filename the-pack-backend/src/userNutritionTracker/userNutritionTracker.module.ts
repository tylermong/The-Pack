import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NutritionTrackerService } from './userNutritionTracker.service';
import { NutritionTrackerController } from './userNutritionTracker.controller';
@Module({

    imports: [PrismaModule],
    controllers: [NutritionTrackerController],
    providers: [NutritionTrackerService, PrismaService]
})
export class NutritionTrackerModule {}
