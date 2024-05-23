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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithPassword } from 'src/types';
import { InjectJwtInterceptor } from 'src/interceptors/injectJWT.service';
import { UUID } from 'crypto';

@Controller('/integrations/assignor')
@UseInterceptors(new InjectJwtInterceptor())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: RequestWithPassword,
  ) {
    const user = await this.usersService.create(
      createUserDto,
      req.hashPassword,
    );
    return user;
  }
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithPassword,
  ) {
    return this.usersService.update(id, updateUserDto, req.hashPassword);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.usersService.remove(id);
  }
}
