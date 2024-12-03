import { IsString, IsOptional} from 'class-validator';

export class UpdateProgramDto {
  programId: string;  
  
  @IsString()
  @IsOptional()
  programDescription?: string;  
}