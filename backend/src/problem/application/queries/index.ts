import { FindProblemBySlugHandler } from './find-problem-by-slug-query/find-problem-by-slug.handler';
import { FindProblemSolutionsBySlugHandler } from './find-problem-solutions-by-slug-query/find-problem-solutions-by-slug.handler';
import { GetProblemSetupHandler } from './get-problem-setup-query/get-problem-setup.handler';
import { GetProblemsPageableHandler } from './get-problems-pageable-query/get-problems-pageable.handler';

export const ProblemQueryHandlers = [
  GetProblemsPageableHandler,
  FindProblemBySlugHandler,
  GetProblemSetupHandler,
  FindProblemSolutionsBySlugHandler,
];
