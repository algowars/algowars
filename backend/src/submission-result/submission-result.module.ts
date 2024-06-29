import { Module } from '@nestjs/common';
import { SubmissionResultController } from './submission-result.controller';
import { SubmissionResultFactories } from './factories';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionResultQueryHandlers } from './queries';
import { EvaluationQueryHandlers } from 'src/evaluation/queries';
import { SubmissionResultDtoRepository } from './db/submission-result-dto.repository';
import { SubmissionResultTestcaseEntityRepository } from './db/submission-result-testcase/submission-result-testcase-entity.repository';
import { SubmissionResultSchema } from './db/submission-result.schema';
import { SubmissionResultTestcaseSchema } from './db/submission-result-testcase/submission-result-testcase.schema';
import { SubmissionResultTestcaseSchemaFactory } from './db/submission-result-testcase/submission-result-testcase-schema.factory';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SubmissionResultEntityRepository } from './db/submission-result-entity.repository';
import { SubmissionResultFactory } from './factories/submission-result.factory';
import { AccountSchema, ProblemSchema } from 'src/db';
import { SubmissionResultSchemaFactory } from './db/submission-result-schema.factory';
import { AccountSchemaFactory } from 'src/account/db/account-schema.factory';
import { SubmissionResultCommandHandlers } from './commands';

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
      AccountSchema,
      ProblemSchema,
      SubmissionResultSchema,
      SubmissionResultTestcaseSchema,
    ]),
  ],
  controllers: [SubmissionResultController],
  providers: [
    EvaluationService,
    SubmissionResultTestcaseEntityRepository,
    SubmissionResultTestcaseSchemaFactory,
    SubmissionResultEntityRepository,
    SubmissionResultEntityRepository,
    SubmissionResultTestcaseEntityRepository,
    SubmissionResultSchemaFactory,
    AccountSchemaFactory,
    SubmissionResultFactory,
    SubmissionResultDtoRepository,
    ...SubmissionResultFactories,
    ...SubmissionResultQueryHandlers,
    ...SubmissionResultCommandHandlers,
    ...EvaluationQueryHandlers,
  ],
})
export class SubmissionResultModule {}
