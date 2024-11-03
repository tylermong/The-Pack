import { Module } from '@nestjs/common';
import { userClassesService } from './userClasses.service';
import { userClassesController } from './userClasses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [userClassesController],
  providers: [userClassesService, PrismaService],
})

export class userClassesModule {}