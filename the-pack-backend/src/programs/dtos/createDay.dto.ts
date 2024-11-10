import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateDayDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    weekId: string;
}