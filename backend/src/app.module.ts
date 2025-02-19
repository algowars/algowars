import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { RequestStorageMiddleware } from 'lib/request-storage-middleware';
import { CodeExecutionModule } from 'lib/code-execution/code-execution.module';
import { S3Module } from 'lib/s3.module';
import { DatabaseModule } from 'lib/database.module';
import { AccountModule } from './account/account.module';
import { ProblemModule } from './problem/problem.module';
import { SubmissionModule } from './submission/submission.module';
import { EloModule } from './elo/elo.module';
import { GameModule } from './game/game.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    S3Module,
    CodeExecutionModule,
    ThrottlerModule.forRoot(),
    AccountModule,
    ProblemModule,
    SubmissionModule,
    EloModule,
    GameModule,
    HealthModule,
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
