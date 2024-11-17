import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  coachId: string;

  @IsString()
  @IsNotEmpty()
  timeSlotId: string;

  @IsDateString()
  appointmentdate: string; // Or use Date depending on how you want to handle the date format
}
