import { IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateMessagesDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    content: string

    @IsNotEmpty()
    @IsString()
    userID: string 

    @IsNotEmpty()
    @IsString()
    chatroomId: string 
}