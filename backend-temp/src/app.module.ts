import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { RequestStorageMiddleware } from 'lib/request-storage-middleware';
import { SubmissionModule } from './submission/submission.module';
import { CodeExecutionModule } from 'lib/code-execution/code-execution.module';
import { S3Module } from 'lib/s3.module';
import { KnexModule } from 'nest-knexjs';
import { DatabaseModule } from 'lib/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    S3Module,
    CodeExecutionModule,
    ProblemModule,
    ThrottlerModule.forRoot(),
    AccountModule,
    SubmissionModule,
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