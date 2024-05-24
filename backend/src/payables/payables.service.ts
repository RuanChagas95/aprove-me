import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { UUID } from 'crypto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PayablesService {
  constructor(readonly prisma: PrismaService) {}

  create(createPayableDto: CreatePayableDto, assignor: UUID) {
    return this.prisma.payable.create({
      data: { ...createPayableDto, assignor },
    });
  }

  findOne(id: UUID) {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  update(id: UUID, updatePayableDto: UpdatePayableDto) {
    return this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  remove(id: UUID) {
    return this.prisma.user.delete({ where: { id } });
  }
}
