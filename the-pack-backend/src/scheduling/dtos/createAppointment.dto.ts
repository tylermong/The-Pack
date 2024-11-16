import { IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  clientId: string;

  @IsString()
  coachId: string;

  @IsString()
  timeSlotId: string;

  @IsDateString()
  date: string; // Or use Date depending on how you want to handle the date format
}
