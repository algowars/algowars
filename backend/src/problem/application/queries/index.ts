import { FindProblemBySlugHandler } from './find-problem-by-slug-query/find-problem-by-slug.handler';
import { GetProblemSetupHandler } from './get-problem-setup-query/get-problem-setup.handler';
import { GetProblemSolutionsHandler } from './get-problem-solutions-query/get-problem-solutions.handler';
import { GetProblemsPageableHandler } from './get-problems-pageable-query/get-problems-pageable.handler';

export const ProblemQueryHandlers = [
  FindProblemBySlugHandler,
  GetProblemsPageableHandler,
  GetProblemSolutionsHandler,
  GetProblemSetupHandler,
];
