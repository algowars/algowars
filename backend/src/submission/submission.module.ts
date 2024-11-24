import { Logger, Module, Provider } from '@nestjs/common';
import { SubmissionController } from './interface/submission.controller';
import { SubmissionCommandHandlers } from './application/commands';
import { SubmissionFactory } from './domain/submission-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/injection-token';
import { SubmissionRepositoryImplementation } from './infrastructure/repositories/submission-repository-implementation';
import { ProblemModule } from 'src/problem/problem.module';
import { domain as problemDomain } from 'src/problem/problem.module';
import { HttpModule } from '@nestjs/axios';
import { SubmissionEventHandlers } from './application/events';
import { StatusRepositoryImplementation } from './infrastructure/repositories/status-repository-implementation';
import { StatusFactory } from './domain/status-factory';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
  {
    provide: InjectionToken.STATUS_REPOSITORY,
    useClass: StatusRepositoryImplementation,
  },
];

const application = [...SubmissionCommandHandlers, ...SubmissionEventHandlers];

const domain = [SubmissionFactory, StatusFactory, ...problemDomain];

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
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class SubmissionModule {}
