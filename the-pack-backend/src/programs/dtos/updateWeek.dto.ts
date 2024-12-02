import { IsString, IsOptional} from 'class-validator';

export class UpdateWeekDto {

  programId: string;  

  @IsString()
  @IsOptional()
  weekName: string;
}