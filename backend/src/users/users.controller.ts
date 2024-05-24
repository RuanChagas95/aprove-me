import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { AuthUserDto } from './dto/auth-user.dto';
import { InjectJwtInterceptor } from '../interceptors/injectJWT.service';
import { RequestWithPassword } from '../types';

@Controller('/integrations')
@UseInterceptors(new InjectJwtInterceptor())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/assignor')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: RequestWithPassword,
  ) {
    const user = await this.usersService.create(
      createUserDto,
      req.hashPassword,
    );
    if (!user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return user;
  }

  @Post('/auth')
  async auth(@Body() authUserDto: AuthUserDto) {
    const user = await this.usersService.auth(authUserDto);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return { user };
  }

  @Get('/assignor/:id')
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Patch('/assignor/:id')
  update(
    @Param('id') id: UUID,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithPassword,
  ) {
    return this.usersService.update(id, updateUserDto, req.hashPassword);
  }

  @Delete('/assignor/:id')
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }
}
