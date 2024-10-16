// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // Other modules used by this module
  controllers: [AppController], // Controllers for handling HTTP requests
  providers: [AppService], // Services and other providers
})
export class AppModule {}