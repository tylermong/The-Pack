import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  programURL: string;
  
  @IsString()
  @IsNotEmpty()
  programName: string;

  @IsString()
  programDecription: string;

  @IsString()
  programTags: string;

  @IsUUID()
  userId: string;
}