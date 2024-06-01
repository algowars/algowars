import { ProblemPagination } from '../dto/request/problem-pagination.dto';

export class ProblemsQuery {
  constructor(public readonly problemPagination: ProblemPagination) {}
}
