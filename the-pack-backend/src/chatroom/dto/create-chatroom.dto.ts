import { IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CreateChatroomDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string

    @IsNotEmpty()
    @IsString()
    coachId: string 
}