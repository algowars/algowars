import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from '../application/queries/find-problem-by-slug-query/find-problem-by-slug.query';
import { FindProblemBySlugRequestParam } from './dto/request/find-problem-by-slug-request-param.dto';
import { FindProblemBySlugResponseDto } from './dto/response/find-problem-by-slug-response.dto';

@Controller('v1/problem')
export class ProblemController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('find/slug/:slug')
  async findProblemBySlug(
    @Param() param: FindProblemBySlugRequestParam,
  ): Promise<FindProblemBySlugResponseDto> {
    return this.queryBus.execute(new FindProblemBySlugQuery(param.slug));
  }
}
