import { IsString, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TimeSlotDto {
  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}

export class CreateAvailabilityDto {
  @IsString()
  coachId: string;

  @IsDate()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  timeSlots: TimeSlotDto[];
}
