import { Module } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorController } from './evaluator.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Problem, Submission } from 'src/data-model/entities';
import { ProblemService } from 'src/problem/problem.service';
import { AccountService } from 'src/account/account.service';
import { SubmissionService } from 'src/submission/submission.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.THREE_SECONDS,
        limit: 1,
      },
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('EVALUATOR_URL'),
        headers: {
          'X-RapidAPI-Key': configService.get<string>('EVALUATOR_API_KEY'),
          'X-RapidAPI-Host': configService.get<string>('EVALUATOR_HOST'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Problem, Account, Submission]),
  ],
  controllers: [EvaluatorController],
  providers: [
    EvaluatorService,
    ProblemService,
    AccountService,
    SubmissionService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class EvaluatorModule {}
