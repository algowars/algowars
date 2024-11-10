import { Logger, Module, Provider } from '@nestjs/common';
import { ProblemController } from './interface/problem.controller';
import { InjectionToken } from './application/injection-token';
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
import { domain as accountDomain } from 'src/account/account.module';
import { ProblemStatusRepositoryImplementation } from './infrastructure/repositories/problem-status-repository-implementation';
import { ProblemStatusFactory } from './domain/problem-status-factory';

export const infrastructure: Provider[] = [
  {
    provide: InjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryImplementation,
  },
  {
    provide: InjectionToken.PROBLEM_REPOSITORY,
    useClass: ProblemRepositoryImplementation,
  },
  {
    provide: InjectionToken.LANGUAGE_REPOSITORY,
    useClass: LanguageRepositoryImplementation,
  },
  {
    provide: InjectionToken.LANGUAGE_QUERY,
    useClass: LanguageQueryImplementation,
  },
  {
    provide: InjectionToken.ADDITIONAL_TEST_FILE_REPOSITORY,
    useClass: AdditionalTestFileRepositoryImplementation,
  },
  {
    provide: InjectionToken.PROBLEM_SETUP_REPOSITORY,
    useClass: ProblemSetupRepositoryImplementation,
  },
  {
    provide: InjectionToken.PROBLEM_STATUS_REPOSITORY,
    useClass: ProblemStatusRepositoryImplementation,
  },
];

export const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

export const domain = [
  ProblemFactory,
  LanguageFactory,
  ProblemSetupFactory,
  ProblemStatusFactory,
  TestFactory,
  AdditionalTestFileFactory,
  ...accountDomain,
];

@Module({
  imports: [CqrsModule, AccountModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class ProblemModule {}
