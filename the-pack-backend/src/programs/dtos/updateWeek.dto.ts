import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateProgramWeekDto {
  @IsUUID()
  programWeekId: string;  

  @IsString()
  @IsOptional()
  numOfWeeks?: string;  
}
