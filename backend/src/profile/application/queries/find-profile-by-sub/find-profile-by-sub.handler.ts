import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProfileBySubQuery } from './find-profile-by-sub.query';
import { FindProfileBySubResult } from './find-profile-by-sub-result';
import { Inject } from '@nestjs/common';

@QueryHandler(FindProfileBySubQuery)
export class FindProfileBySubHandler
  implements IQueryHandler<FindProfileBySubQuery, FindProfileBySubResult>
{
  @Inject()
  async execute(
    query: FindProfileBySubQuery,
  ): Promise<FindProfileBySubResult> {}
}
