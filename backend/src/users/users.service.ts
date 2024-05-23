import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto, password: string) {
    const user = await this.prisma.user.create({
      data: { ...createUserDto, password },
    });
    delete user.password;
    return { user };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: UUID) {
    return `This action returns a #${id} user`;
  }

  async update(
    id: UUID,
    updateUserDto: UpdateUserDto,
    password: string = null,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, ...(password && { password }) },
      select: { id: true },
    });
  }

  remove(id: UUID) {
    return `This action removes a #${id} user`;
  }
}
