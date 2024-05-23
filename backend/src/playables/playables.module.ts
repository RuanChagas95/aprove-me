import { Module } from '@nestjs/common';
import { PlayablesService } from './playables.service';
import { PlayablesController } from './playables.controller';

@Module({
  controllers: [PlayablesController],
  providers: [PlayablesService],
})
export class PlayablesModule {}
