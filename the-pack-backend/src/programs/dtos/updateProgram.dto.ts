import { IsString, IsOptional} from 'class-validator';

export class UpdateProgramDto {
  userId: string;  
  
  @IsString()
  @IsOptional()
  programDescription?: string;  
}