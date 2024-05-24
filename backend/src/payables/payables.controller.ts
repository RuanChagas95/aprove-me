import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';

@Controller('/integrations/payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @Get()
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payablesService.remove(+id);
  }
}
