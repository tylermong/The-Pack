import { Module } from '@nestjs/common';
import { ProgramService } from './programs.service';
import { ProgramsController } from './programs.controller';

@Module({
    imports = [],
    controllers = [ProgramsController],
    providers = [ProgramService]
})
export class ProgramsModule {}
