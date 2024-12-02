import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  programName: string;

  @IsString()
  @IsNotEmpty()
  programDecription: string;

  @IsUUID()
  userId: string;
}