import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { UUID } from 'crypto';
import { compare } from 'bcrypt';

const userSelect = {
  id: true,
  email: true,
  name: true,
  document: true,
  phone: true,
};

@Injectable()
export class UsersService {
  constructor(readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto, password: string) {
    try {
      const user = await this.prisma.user.create({
        data: { ...createUserDto, password },
        select: userSelect,
      });
      return { user };
    } catch (error) {
      if (
        error.code === 'P2002' &&
        error.meta.target[0] === 'email' &&
        error.meta.target.length === 1
      ) {
        return null;
      }
      throw error;
    }
  }

  async findOne(id: UUID) {
    return {
      user: await this.prisma.user.findUnique({
        where: { id },
        select: userSelect,
      }),
    };
  }

  async update(
    id: UUID,
    updateUserDto: UpdateUserDto,
    password: string = null,
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, ...(password && { password }) },
      select: userSelect,
    });
    return { user };
  }

  remove(id: UUID) {
    return this.prisma.user.delete({ where: { id } });
  }

  async auth({ login, password }) {
    const user = await this.prisma.user.findUnique({
      where: { email: login },
    });
    if (!user) return null;
    const isValid = await compare(password, user.password);
    if (!isValid) return null;
    delete user.password;
    return { user };
  }
}
