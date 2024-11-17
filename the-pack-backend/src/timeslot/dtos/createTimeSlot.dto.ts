import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeSlotDto {
  @IsDateString()
  startTime: string;  

  @IsDateString()
  endTime: string;    

  @IsString()
  @IsNotEmpty()
  availabilityId: string; 
}
