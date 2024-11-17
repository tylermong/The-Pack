import { IsString, IsOptional, IsDateString } from 'class-validator';

export class ModifyAppointmentDto {
  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  coachId?: string;

  @IsOptional()
  @IsString()
  timeSlotId?: string;

  @IsOptional()
  @IsDateString()
  date?: string; // Optional field if the date needs to be updated
}
