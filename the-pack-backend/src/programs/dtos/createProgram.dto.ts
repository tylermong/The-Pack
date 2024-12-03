import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgramDto {

  @IsString()
  programDecription: string;
  
  @IsUUID()
  userId: string;
}