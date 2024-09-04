import { Module, Provider } from '@nestjs/common';
import { ProblemController } from './interface/problem.controller';
import { InjectionToken } from './application/injection-token';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.PROBLEM_QUERY,
    useClass: ProblemQueryIM,
  },
];

@Module({
  controllers: [ProblemController],
})
export class ProblemModule {}
