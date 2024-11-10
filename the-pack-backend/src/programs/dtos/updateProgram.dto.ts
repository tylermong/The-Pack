import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateProgramDto {
  @IsUUID()
  programId: string;  
  
  @IsString()
  @IsOptional()
  programName?: string;  
}
