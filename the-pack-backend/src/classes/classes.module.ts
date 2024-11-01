import { Module } from '@nestjs/common';
import { classesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClassesController],
  providers: [classesService, PrismaService],
})

export class ClassesModule {}