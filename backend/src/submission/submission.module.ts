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
const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
];

const application = [...SubmissionCommandHandlers];

const domain = [SubmissionFactory, ...problemDomain];

@Module({
  imports: [CqrsModule, ProblemModule],
  controllers: [SubmissionController],
  providers: [
    Logger,
    ...infrastructure,
    ...problemInfrastructure,
    ...application,
    ...domain,
    CodeExecutionContextFactory,
    JavaScriptCodeExecutionContext,
  ],
})
export class SubmissionModule {}
