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

}
