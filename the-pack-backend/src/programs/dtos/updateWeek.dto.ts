import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateWeekDto {

  programId: string;  

  @IsString()
  @IsOptional()
  numOfWeeks: string;
}