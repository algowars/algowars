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
import { EvaluationQueryHandlers } from './queries';
import { SubmissionResultTestcaseEntityRepository } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase-entity.repository';
import { SubmissionResultEntityRepository } from 'src/submission-result/db/submission-result-entity.repository';
import { SubmissionResultSchemaFactory } from 'src/submission-result/db/submission-result-schema.factory';
import { SubmissionResultTestcaseSchemaFactory } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase-schema.factory';
import { EvaluationEventHandlers } from './events';

@Module({
  imports: [
    ConfigModule.forRoot(), // Importing ConfigModule for environment variable management
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('EVALUATOR_URL'), // Base URL for the evaluator API
        headers: {
          'X-RapidAPI-Key': configService.get<string>('EVALUATOR_API_KEY'), // API key for authentication
          'X-RapidAPI-Host': configService.get<string>('EVALUATOR_HOST'),   // Host header for the evaluator API
        },
      }),
      inject: [ConfigService], // Injects ConfigService to access environment variables
    }),
    CqrsModule, // Importing CqrsModule to enable CQRS (Command Query Responsibility Segregation) pattern
    TypeOrmModule.forFeature([
      // Registers database schemas with TypeORM
      ProblemSchema,
      ProblemSetupSchema,
      TestSchema,
      TestInputSchema,
      AccountSchema,
      SubmissionResultSchema,
      SubmissionResultTestcaseSchema,
    ]),
  ],
  controllers: [EvaluationController], // Registers EvaluationController
  providers: [
    // List of services, repositories, factories, command/query/event handlers to be provided in the module
    EvaluationService,
    ProblemEntityRepository,
    ProblemSchemaFactory,
    TestSchemaFactory,
    TestInputSchemaFactory,
    ProblemSetupSchemaFactory,
    AccountEntityRepository,
    AccountSchemaFactory,
    SubmissionResultTestcaseFactory,
    SubmissionResultEntityRepository,
    SubmissionResultTestcaseEntityRepository,
    SubmissionResultSchemaFactory,
    SubmissionResultTestcaseSchemaFactory,
    ...EvaluationCommandHandlers,  // Spread operator to include all command handlers
    ...EvaluationFactories,        // Spread operator to include all factories related to evaluations
    ...ProblemFactories,           // Spread operator to include all factories related to problems
    ...SubmissionResultFactories,  // Spread operator to include all factories related to submission results
    ...EvaluationQueryHandlers,    // Spread operator to include all query handlers
    ...EvaluationEventHandlers,    // Spread operator to include all event handlers
  ],
})
export class EvaluationModule { }
