import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [UserModule, AnnouncementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
