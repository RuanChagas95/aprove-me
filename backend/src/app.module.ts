import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlayablesModule } from './playables/playables.module';

@Module({
  imports: [PlayablesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
