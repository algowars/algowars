import { FindProblemSlugDto } from 'src/problem/dto/request/find-problem-slug.dto';

export class FindProblemAggregateBySlugQuery {
  constructor(public readonly findProblemSlugDto: FindProblemSlugDto) {}
}
