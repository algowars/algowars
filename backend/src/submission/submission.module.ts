import { HttpModule } from '@nestjs/axios';
import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CodeExecutionModule } from 'lib/code-execution/code-execution.module';
import { SubmissionController } from './interface/submission.controller';
import { SubmissionCommandHandlers } from './application/commands';
import { SubmissionInjectionToken } from './application/injection-token';
import { SubmissionFactory } from './domain/submission-factory';
import { SubmissionRepositoryImplementation } from './infrastructure/repositories/submission-repository-implementation';

export const infrastructure: Provider[] = [
  {
    provide: SubmissionInjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
];

const application = [...SubmissionCommandHandlers];

const domain = [SubmissionFactory];

@Module({
  imports: [
    CqrsModule,
    CodeExecutionModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [SubmissionController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class SubmissionModule {}
