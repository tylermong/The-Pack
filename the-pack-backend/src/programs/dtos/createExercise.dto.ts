import { IsString, IsNotEmpty, IsUUID} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseName: string;

  @IsString()
  @IsNotEmpty()
  setNumber: string;

  @IsString()
  @IsNotEmpty()
  reps: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsUUID()
  dayId: string;
}