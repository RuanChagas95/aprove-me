import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptPasswordMiddleware } from 'src/middlewares/encryptPassword.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EncryptPasswordMiddleware)
      .exclude({ path: '*', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
