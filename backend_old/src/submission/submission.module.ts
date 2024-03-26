import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Submission } from 'src/data-model/entities';
import { EvaluatorService } from 'src/evaluator/evaluator.service';
import { AccountService } from 'src/account/account.service';
import { SubmissionGateway } from './submission.gateway';

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
    TypeOrmModule.forFeature([Submission, Account]),
  ],
  controllers: [SubmissionController],
  providers: [
    SubmissionService,
    SubmissionGateway,
    EvaluatorService,
    AccountService,
  ],
})
export class SubmissionModule {}
