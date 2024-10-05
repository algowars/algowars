import { Logger, Module, Provider } from '@nestjs/common';
import { ProblemController } from './interface/problem.controller';
import { InjectionToken } from './application/injection-token';
import { ProblemQueryImplementation } from './infrastructure/queries/problem-query-implementation';
import { ProblemRepositoryImplementation } from './infrastructure/repositories/problem-repository-implementation';
import { ProblemQueryHandlers } from './application/queries';
import { ProblemFactory } from './domain/problem-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemCommandHandlers } from './application/commands';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryImplementation,
  },
  {
    provide: InjectionToken.PROBLEM_REPOSITORY,
    useClass: ProblemRepositoryImplementation,
  },
];

const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

const domain = [ProblemFactory];

@Module({
  imports: [CqrsModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ProblemModule {}
