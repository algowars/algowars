import { Logger, Module, Provider } from '@nestjs/common';
import { ProblemInjectionToken } from './application/injection-token';
import { ProblemFactory } from './domain/problem-factory';
import { ProblemQueryHandlers } from './application/queries';
import { ProblemCommandHandlers } from './application/commands';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemController } from './interface/problem.controller';
import { ProblemQueryImplementation } from './infrastructure/queries/problem-query-implementation';
import { ProblemRepositoryImplementation } from './infrastructure/repositories/problem-repository-implementation';
import { ProblemSetupRepositoryImplementation } from './infrastructure/repositories/problem-setup-repository-implementation';
import { LanguageQueryImplementation } from './infrastructure/queries/language-query-implementation';
import { LanguageRepositoryImplementation } from './infrastructure/repositories/language-repository-implementation';
import { SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionRepositoryImplementation } from 'src/submission/infrastructure/repositories/submission-repository-implementation';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { AccountModule } from 'src/account/account.module';
import { SubmissionQueryImplementation } from 'src/submission/infrastructure/queries/submission-query-implementation';

const infrastructure: Provider[] = [
  {
    provide: ProblemInjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryImplementation,
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
    provide: ProblemInjectionToken.LANGUAGE_QUERY,
    useClass: LanguageQueryImplementation,
  },
  {
    provide: ProblemInjectionToken.LANGUAGE_REPOSITORY,
    useClass: LanguageRepositoryImplementation,
  },
  {
    provide: SubmissionInjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
  {
    provide: SubmissionInjectionToken.SUBMISSION_QUERY,
    useClass: SubmissionQueryImplementation,
  },
];

export const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

export const domain = [ProblemFactory, SubmissionFactory];

@Module({
  imports: [CqrsModule, AccountModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class ProblemModule {}
