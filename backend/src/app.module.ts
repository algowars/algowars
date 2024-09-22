import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { DatabaseModule } from '../lib/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { RequestStorageMiddleware } from 'lib/request-storage-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProblemModule,
    ThrottlerModule.forRoot(),
    AccountModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('');
  }
}
