import { IsString, IsOptional, IsInt, IsEnum, IsNumber, IsUUID, IsDateString, Min } from 'class-validator';
import { ExerciseIntensity } from '@prisma/client';

export class CreateExerciseTrackerDto{
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsUUID()
    userId: string

    @IsOptional()
    @IsInt()
    @Min(0)
    duration?: number

    @IsOptional()
    @IsNumber()
    @Min(0)
    caloriesBurned?:number

    @IsOptional()
    @IsString()
    exerciseType?: string

    @IsOptional()
    @IsString()
    notes?: string;
}