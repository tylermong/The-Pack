import { IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CreateAnnouncementsDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string

    @IsOptional()
    @IsString()
    content?: string | null

    @IsNotEmpty()
    @IsString()
    authorId: string 
}