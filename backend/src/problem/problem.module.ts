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
];

export const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

export const domain = [ProblemFactory, LanguageFactory];

@Module({
  imports: [CqrsModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class ProblemModule {}
