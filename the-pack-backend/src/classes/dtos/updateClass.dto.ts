import { IsString, IsOptional, IsUUID, IsArray, IsDateString } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  assignedCoachId?: string;  // ID of the assigned coach

  @IsOptional()
  @IsArray()
  classDates?: UpdateClassDateDto[];
}

class UpdateClassDateDto {
  @IsDateString()
  date: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}


