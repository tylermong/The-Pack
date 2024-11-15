import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateProgramDto {
  programId: string;  
  
  @IsString()
  @IsOptional()
  programName?: string;  
}