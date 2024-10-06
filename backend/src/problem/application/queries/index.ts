import { FindProblemBySlugHandler } from './find-problem-by-slug-query/find-problem-by-slug.handler';
import { GetProblemsPageableHandler } from './get-problems-pageable-query/get-problems-pageable.handler';

export const ProblemQueryHandlers = [
  FindProblemBySlugHandler,
  GetProblemsPageableHandler,
];
