import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PayablesModule } from './payables/payables.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [PayablesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
