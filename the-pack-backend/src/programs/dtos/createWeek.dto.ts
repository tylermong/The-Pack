import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWeekDto {
  @IsString()
  @IsNotEmpty()
  numOfWeeks: string;

  @IsUUID()
  programId: string;
}