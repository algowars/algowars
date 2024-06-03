import { FindProblemByIdHandler } from './find-problem-by-id/find-problem-by-id.handler';
import { ProblemsPaginationHandler } from './problems-pagination/problems-pagination.handler';

export const ProblemQueryHandlers = [
  ProblemsPaginationHandler,
  FindProblemByIdHandler,
];
