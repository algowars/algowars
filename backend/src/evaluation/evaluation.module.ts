import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EvaluationCommandHandlers } from './commands';
import { EvaluationService } from './services/evaluation.service';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';
import { EvaluationFactories } from './factories';
import { ProblemFactories } from 'src/problem/factories';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccountSchema,
  ProblemSchema,
  ProblemSetupSchema,
  TestInputSchema,
  TestSchema,
} from 'src/db';
import { ProblemSchemaFactory } from 'src/problem/db/problem/problem-schema.factory';
import { TestSchemaFactory } from 'src/problem/db/test/test-schema.factory';
import { ProblemSetupSchemaFactory } from 'src/problem/db/problem-setup/problem-setup-schema.factory';
import { TestInputSchemaFactory } from 'src/problem/db/test/test-input.schema.factory';
import { SubmissionResultFactories } from 'src/submission-result/factories';
import { AccountEntityRepository } from 'src/account/db/account-entity.repository';
import { AccountSchemaFactory } from 'src/account/db/account-schema.factory';
import { SubmissionResultSchema } from 'src/submission-result/db/submission-result.schema';
import { SubmissionResultTestcaseSchema } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase.schema';
import { SubmissionResultTestcaseFactory } from 'src/submission-result/factories/submission-result-testcase/submission-result-testcase.factory';

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
    CqrsModule,
    TypeOrmModule.forFeature([
      ProblemSchema,
      ProblemSetupSchema,
      TestSchema,
      TestInputSchema,
      AccountSchema,
      SubmissionResultSchema,
      SubmissionResultTestcaseSchema,
    ]),
  ],
  controllers: [EvaluationController],
  providers: [
    EvaluationService,
    ProblemEntityRepository,
    ProblemSchemaFactory,
    TestSchemaFactory,
    TestInputSchemaFactory,
    ProblemSetupSchemaFactory,
    AccountEntityRepository,
    AccountSchemaFactory,
    SubmissionResultTestcaseFactory,
    ...EvaluationCommandHandlers,
    ...EvaluationFactories,
    ...ProblemFactories,
    ...SubmissionResultFactories,
  ],
})
export class EvaluationModule {}
