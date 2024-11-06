import { Module } from '@nestjs/common';
import { ExerciseTrackerController } from './userExerciseTracker.controller';
import { ExerciseTrackerService } from './userExerciseTracker.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [PrismaModule],
    controllers: [ExerciseTrackerController],
    providers: [ExerciseTrackerService, PrismaService]
})
export class ExerciseTrackerModule {}
