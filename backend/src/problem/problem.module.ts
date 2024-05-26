import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  Problem,
  ProblemSetup,
  TestInput,
} from 'src/data-model/entities';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { TestInputService } from 'src/test-input/test-input.service';
import { AccountService } from 'src/account/account.service';
import { ProblemValidator } from './validators/problem.validator';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Account, TestInput, ProblemSetup]),
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
  ],

  controllers: [ProblemController],
  providers: [
    ProblemService,
    ProblemSetupService,
    TestInputService,
    AccountService,
    ProblemValidator,
  ],
})
export class ProblemModule {}
