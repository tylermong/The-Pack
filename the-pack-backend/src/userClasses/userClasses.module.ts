import { Module } from '@nestjs/common';
import { userClassesService } from './userClasses.service';
import { userClassesController } from './userClasses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [userClassesController],
  providers: [userClassesService],
})

export class schedulingModule {}