import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSolutionsQuery } from './get-problem-solutions.query';
import { GetProblemSolutionsResult } from './get-problem-solutions.result';

@QueryHandler(GetProblemSolutionsQuery)
export class GetProblemSolutionsHandler
  implements IQueryHandler<GetProblemSolutionsQuery, GetProblemSolutionsResult>
{
  execute(query: GetProblemSolutionsQuery): Promise<GetProblemSolutionsResult> {
    throw new Error('Method not implemented.');
  }
}
