import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlayablesService } from './playables.service';
import { CreatePlayableDto } from './dto/create-playable.dto';

@Controller('playables')
export class PlayablesController {
  constructor(private readonly playablesService: PlayablesService) {}

  @Post()
  create(@Body() createPlayableDto: CreatePlayableDto) {
    return this.playablesService.create(createPlayableDto);
  }

  @Get()
  findAll() {
    return this.playablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playablesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playablesService.remove(+id);
  }
}
