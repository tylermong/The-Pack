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
  setNumber?: string; 

  @IsString()
  @IsOptional()
  reps?: string;  

  @IsString()
  @IsOptional()
  weight?: string; 
}