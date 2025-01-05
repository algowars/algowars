import { HttpModule } from '@nestjs/axios';
import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CodeExecutionModule } from 'lib/code-execution/code-execution.module';
import { SubmissionController } from './interface/submission.controller';
import { SubmissionCommandHandlers } from './application/commands';
import { SubmissionInjectionToken } from './application/injection-token';
import { SubmissionFactory } from './domain/submission-factory';
import { SubmissionRepositoryImplementation } from './infrastructure/repositories/submission-repository-implementation';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { ProblemRepositoryImplementation } from 'src/problem/infrastructure/repositories/problem-repository-implementation';
import { ProblemSetupRepositoryImplementation } from 'src/problem/infrastructure/repositories/problem-setup-repository-implementation';
import { AccountModule } from 'src/account/account.module';
import { SubmissionEventHandlers } from './application/events';
import { SubmissionGateway } from './interface/submission.gateway';
import { SubmissionQueryHandlers } from './application/queries';
import { SubmissionQueryImplementation } from './infrastructure/queries/submission-query-implementation';

export const infrastructure: Provider[] = [
  {
    provide: SubmissionInjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
  {
    provide: ProblemInjectionToken.PROBLEM_REPOSITORY,
    useClass: ProblemRepositoryImplementation,
  },
  {
    provide: ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY,
    useClass: ProblemSetupRepositoryImplementation,
  },
  {
    provide: SubmissionInjectionToken.SUBMISSION_QUERY,
    useClass: SubmissionQueryImplementation,
  },
];

export const application = [
  ...SubmissionCommandHandlers,
  ...SubmissionQueryHandlers,
  ...SubmissionEventHandlers,
];

export const domain = [SubmissionFactory];

@Module({
  imports: [
    CqrsModule,
    CodeExecutionModule,
    AccountModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [SubmissionController],
  providers: [
    Logger,
    SubmissionGateway,
    ...infrastructure,
    ...application,
    ...domain,
  ],
  exports: [...infrastructure, ...domain],
})
export class SubmissionModule {}
