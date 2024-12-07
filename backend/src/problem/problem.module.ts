import { Logger, Module, Provider } from '@nestjs/common';
import { ProblemController } from './interface/problem.controller';
import { ProblemQueryImplementation } from './infrastructure/queries/problem-query-implementation';
import { ProblemRepositoryImplementation } from './infrastructure/repositories/problem-repository-implementation';
import { ProblemQueryHandlers } from './application/queries';
import { ProblemFactory } from './domain/problem-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemCommandHandlers } from './application/commands';
import { LanguageRepositoryImplementation } from './infrastructure/repositories/language-repository-implementation';
import { LanguageFactory } from './domain/language-factory';
import { LanguageQueryImplementation } from './infrastructure/queries/language-query-implementation';
import { ProblemSetupFactory } from './domain/problem-setup-factory';
import { TestFactory } from 'src/problem/domain/test-factory';
import { AdditionalTestFileFactory } from 'src/problem/domain/additional-test-file-factory';
import { AdditionalTestFileRepositoryImplementation } from './infrastructure/repositories/additional-test-file-repository-implementation';
import { ProblemSetupRepositoryImplementation } from './infrastructure/repositories/problem-setup-repository-implementation';
import { AccountModule } from 'src/account/account.module';
import { SubmissionRepositoryImplementation } from 'src/submission/infrastructure/repositories/submission-repository-implementation';
import { SubmissionModule } from 'src/submission/submission.module';
import { ProblemInjectionToken } from './application/injection-token';
import { SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { SubmissionResultFactory } from 'src/submission/domain/submission-result-factory';

export const infrastructure: Provider[] = [
  {
    provide: ProblemInjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryImplementation,
  },
  {
    provide: ProblemInjectionToken.PROBLEM_REPOSITORY,
    useClass: ProblemRepositoryImplementation,
  },
  {
    provide: ProblemInjectionToken.LANGUAGE_REPOSITORY,
    useClass: LanguageRepositoryImplementation,
  },
  {
    provide: ProblemInjectionToken.LANGUAGE_QUERY,
    useClass: LanguageQueryImplementation,
  },
  {
    provide: ProblemInjectionToken.ADDITIONAL_TEST_FILE_REPOSITORY,
    useClass: AdditionalTestFileRepositoryImplementation,
  },
  {
    provide: ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY,
    useClass: ProblemSetupRepositoryImplementation,
  },
  {
    provide: SubmissionInjectionToken.SUBMISSION_REPOSITORY,
    useClass: SubmissionRepositoryImplementation,
  },
];

export const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

export const domain = [
  ProblemFactory,
  LanguageFactory,
  ProblemSetupFactory,
  TestFactory,
  AdditionalTestFileFactory,
  SubmissionFactory,
  SubmissionResultFactory,
];

@Module({
  imports: [CqrsModule, AccountModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class ProblemModule {}
