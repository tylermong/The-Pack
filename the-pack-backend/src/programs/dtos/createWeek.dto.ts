import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWeekDto {
  @IsString()
  @IsNotEmpty()
  weekName: string;

  @IsUUID()
  programId: string;
}