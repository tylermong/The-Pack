import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateAvailabilityDto {
  @IsOptional()
  @IsString()
  coachId?: string; 

  @IsOptional()
  @IsDate()
  date?: Date; 

  @IsOptional()
  @IsDate()
  startTime?: Date; 

  @IsOptional()
  @IsDate()
  endTime?: Date; 
}
