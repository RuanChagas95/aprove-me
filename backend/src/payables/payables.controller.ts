import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UUID } from 'crypto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { AuthenticatedRequest } from '../types';

@Controller('/integrations/payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  create(
    @Body() createPayableDto: CreatePayableDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.payablesService.create(createPayableDto, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update(id, updatePayableDto);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.payablesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.payablesService.remove(id);
  }
}
