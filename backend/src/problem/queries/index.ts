import { FindProblemAggregateBySlugHandler } from './find-problem-aggregate-by-slug/find-problem-aggregate-by-slug.handler';
import { FindProblemByIdHandler } from './find-problem-by-id/find-problem-by-id.handler';
import { ProblemsPaginationHandler } from './problems-pagination/problems-pagination.handler';

export const ProblemQueryHandlers = [
  ProblemsPaginationHandler,
  FindProblemByIdHandler,
  FindProblemAggregateBySlugHandler,
];
