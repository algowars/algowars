import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProblemsPageableParam } from './dto/request/get-problems-pageable-param.dto';
import { PageResult } from 'src/common/pagination/page-result';
import { GetProblemsPaginatedResponse } from './dto/response/get-problems-paginated-response.dto';
import { GetProblemsPageableQuery } from '../application/queries/get-problems-pageable-query/get-problems-pageable.query';
import { FindProblemBySlugRequestParam } from './dto/request/find-problem-by-slug-request-param.dto';
import { FindProblemBySlugRequestQuery } from './dto/request/find-problem-by-slug-request-query.dto';
import { FindProblemBySlugResponseDto } from './dto/response/find-problem-by-slug-response.dto';
import { FindProblemBySlugQuery } from '../application/queries/find-problem-by-slug-query/find-problem-by-slug.query';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getProblemsPaginated(
    @Query() query: GetProblemsPageableParam,
  ): Promise<PageResult<GetProblemsPaginatedResponse>> {
    return this.queryBus.execute(
      new GetProblemsPageableQuery(query.page, query.size, query.timestamp),
    );
  }

  @Get('find/slug/:slug')
  async findProblemBySlug(
    @Param() param: FindProblemBySlugRequestParam,
    @Query() query: FindProblemBySlugRequestQuery,
  ): Promise<FindProblemBySlugResponseDto> {
    return this.queryBus.execute(
      new FindProblemBySlugQuery(param.slug, query.languageId),
    );
  }
}
