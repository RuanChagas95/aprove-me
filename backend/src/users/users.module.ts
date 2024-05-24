import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EncryptPasswordMiddleware } from './middlewares/encryptPassword.service';
import { VerifyAuth } from '../middlewares/verifyAuth.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EncryptPasswordMiddleware)
      .exclude({ path: '(.*)', method: RequestMethod.GET })
      .forRoutes(UsersController);
    consumer
      .apply(VerifyAuth)
      .exclude({ path: '(.*)', method: RequestMethod.POST })
      .forRoutes(UsersController);
  }
}
