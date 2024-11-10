import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  programName: string;

  @IsUUID()
  userId: string;
}
