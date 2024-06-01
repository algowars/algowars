import { ProblemPagination } from 'src/problem/dto/request/problem-pagination.dto';

export class ProblemsPaginationQuery {
  constructor(public readonly problemPagination: ProblemPagination) {}
}
