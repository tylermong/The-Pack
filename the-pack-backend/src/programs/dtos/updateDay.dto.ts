import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateDayDto {
    
  dayId: string;  

  @IsString()
  @IsOptional()
  dayName?: string; 
}