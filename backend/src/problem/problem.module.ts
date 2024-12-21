import { Logger, Module, Provider } from '@nestjs/common';
import { ProblemInjectionToken } from './application/injection-token';
import { ProblemFactory } from './domain/problem-factory';
import { ProblemQueryHandlers } from './application/queries';
import { ProblemCommandHandlers } from './application/commands';
import { CqrsModule } from '@nestjs/cqrs';
import { ProblemController } from './interface/problem.controller';
import { ProblemQueryImplementation } from './infrastructure/queries/problem-query-implementation';

const infrastructure: Provider[] = [
  {
    provide: ProblemInjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryImplementation,
  },
  {
    provide: ProblemInjectionToken.PROBLEM_REPOSITORY,
    useClass: ProblemQueryImplementation,
  },
];

export const application = [...ProblemQueryHandlers, ...ProblemCommandHandlers];

export const domain = [ProblemFactory];

@Module({
  imports: [CqrsModule],
  controllers: [ProblemController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class ProblemModule {}
