import { Injectable } from "@nestjs/common";
import { CreateProgramDto } from "./dtos/createProgram.dto";

@Injectable()
export class ProgramService{
    private programs = [];

    create(createProgramDto: CreateProgramDto){
        this.programs.push(createProgramDto);
        return 'Adds a new Program'
    }
    findAll(){
        return this.programs
    }
}