import { IsString, IsNotEmpty, IsUUID} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  exerciseName: string;

  @IsString()
  @IsNotEmpty()
  numOfSets: string;

  @IsString()
  @IsNotEmpty()
  numOfReps: string;

  @IsString()
  @IsNotEmpty()
  weightLifted: string;

  @IsUUID()
  dayId: string;
}
