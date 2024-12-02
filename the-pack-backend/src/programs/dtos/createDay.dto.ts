import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateDayDto{
    @IsString()
    @IsNotEmpty()
    dayName: string;

    @IsUUID()
    weekId: string;
}