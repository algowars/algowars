import { Logger, Module, Provider } from '@nestjs/common';
import { SubmissionController } from './interface/submission.controller';
import { SubmissionCommandHandlers } from './application/commands';
import { SubmissionFactory } from './domain/submission-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection-token';
import { SubmissionRepositoryImplementation } from './infrastructure/repositories/submission-repository-implementation';
import { ProblemModule } from 'src/problem/problem.module';
import {
  infrastructure as problemInfrastructure,
  domain as problemDomain,
} from 'src/problem/problem.module';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { JavaScriptCodeExecutionContext } from 'lib/code-execution/languages/javascript-code-execution-context';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Judge0CodeExecutionService } from 'lib/code-execution/judge0-code-execution-service';
import { S3Service } from 'lib/s3.module';
const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
];

const application = [...SubmissionCommandHandlers];

const domain = [SubmissionFactory, ...problemDomain];

@Module({
  imports: [
    CqrsModule,
    ProblemModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [SubmissionController],
  providers: [
    Logger,
    ...infrastructure,
    ...problemInfrastructure,
    ...application,
    ...domain,
    CodeExecutionContextFactory,
    {
      provide: S3Service,
      useFactory: (configService: ConfigService) =>
        new S3Service(configService),
      inject: [ConfigService],
    },
    {
      provide: Judge0CodeExecutionService,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new Judge0CodeExecutionService(httpService, {
          apiKey: configService.get('EVALUATOR_API_KEY'),
          url: configService.get('EVALUATOR_URL'),
          host: configService.get('EVALUATOR_HOST'),
          headers: {
            'x-rapidapi-key': configService.get('EVALUATOR_API_KEY'),
            'x-rapidapi-host': configService.get('EVALUATOR_HOST'),
            'Content-Type': 'application/json',
          },
        }),
      inject: [HttpService, ConfigService],
    },
    {
      provide: JavaScriptCodeExecutionContext,
      useFactory: (
        judge0CodeExecutionService: Judge0CodeExecutionService,
        s3Service: S3Service,
      ) =>
        new JavaScriptCodeExecutionContext(
          judge0CodeExecutionService,
          s3Service,
        ),
      inject: [Judge0CodeExecutionService, S3Service],
    },
  ],
})
export class SubmissionModule {}
