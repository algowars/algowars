import { ProblemDto } from './problem.dto';
import { TestDto } from './test.dto';

export class ProblemAggregateDto {
  problem: ProblemDto;
  initialCode: string;
  testCases: TestDto[];
}
