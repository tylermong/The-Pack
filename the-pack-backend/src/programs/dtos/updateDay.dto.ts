import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateProgramDayDto {
  @IsUUID()
  dayId: string;  

  @IsString()
  @IsOptional()
  name?: string; 
}
