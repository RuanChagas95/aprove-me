import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { VerifyAuth } from '../middlewares/verifyAuth.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService, PrismaService],
})
export class PayablesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAuth).forRoutes(PayablesController);
  }
}
