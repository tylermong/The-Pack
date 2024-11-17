import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  exerciseId: string;  

  @IsString()
  @IsOptional()
  exerciseName?: string;  

  @IsString()
  @IsOptional()
  numOfSets?: string; 

  @IsString()
  @IsOptional()
  numOfReps?: string;  

  @IsString()
  @IsOptional()
  weightLifted?: string; 
}