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
  ProblemSchema,
  ProblemSetupSchema,
  TestInputSchema,
  TestSchema,
} from 'src/db';
import { ProblemSchemaFactory } from 'src/problem/db/problem/problem-schema.factory';
import { TestSchemaFactory } from 'src/problem/db/test/test-schema.factory';
import { ProblemSetupSchemaFactory } from 'src/problem/db/problem-setup/problem-setup-schema.factory';
import { TestInputSchemaFactory } from 'src/problem/db/test/test-input.schema.factory';

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
    ...EvaluationCommandHandlers,
    ...EvaluationFactories,
    ...ProblemFactories,
  ],
})
export class EvaluationModule {}
