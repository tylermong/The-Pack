import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class ClassResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  assignedCoachId: string;

  @IsArray()
  classDates: ClassDateResponseDto[];
}

class ClassDateResponseDto {
  @IsString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
