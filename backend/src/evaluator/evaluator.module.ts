import { Module } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorController } from './evaluator.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  Player,
  Problem,
  ProblemSetup,
  Submission,
  Test,
  TestInput,
} from 'src/data-model/entities';
import { ProblemService } from 'src/problem/problem.service';
import { AccountService } from 'src/account/account.service';
import { SubmissionService } from 'src/submission/submission.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { PlayerService } from 'src/player/player.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TypeOrmModule.forFeature([
      Problem,
      ProblemSetup,
      Player,
      Test,
      TestInput,
      Submission,
      Account,
    ]),
    ThrottlerModule.forRoot(),
  ],
  controllers: [EvaluatorController],
  providers: [
    EvaluatorService,
    ProblemService,
    AccountService,
    SubmissionService,
    ProblemSetupService,
    PlayerService,
  ],
})
export class EvaluatorModule {}
