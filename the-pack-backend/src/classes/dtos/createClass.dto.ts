import { IsString, IsOptional, IsArray, IsUUID, IsDateString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  assignedCoachId: string;  // ID of the assigned coach

  @IsArray()
  @IsOptional()
  classDates?: CreateClassDateDto[];
}

class CreateClassDateDto {
  @IsDateString()
  date: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
