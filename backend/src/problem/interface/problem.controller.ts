import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from '../application/queries/find-problem-by-slug-query/find-problem-by-slug.query';
import { FindProblemBySlugRequestParam } from './dto/request/find-problem-by-slug-request-param.dto';
import { FindProblemBySlugResponseDto } from './dto/response/find-problem-by-slug-response.dto';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { ProblemPermissions } from '../application/permissions/problem-permissions';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { CreateProblemRequest } from './dto/request/create-problem.dto';
import { CreateProblemCommand } from '../application/commands/create-problem/create-problem.command';
import { Request } from 'express';
import { GetProblemsPageableParam } from './dto/request/get-problems-pageable-param.dto';
import { PageResult } from 'src/common/pagination/page-result';
import { GetProblemsPaginatedResponse } from './dto/response/get-problems-paginated-response.dto';
import { GetProblemsPageableQuery } from '../application/queries/get-problems-pageable-query/get-problems-pageable.query';
import { FindProblemSolutionsParam } from './dto/request/find-problem-solutions-param.dto';
import { FindProblemSolutionsQuery } from '../application/queries/find-problem-solutions-query/find-problem-solutions.query';
import { FindProblemSolutionsResponse } from './dto/response/find-problem-solutions-response.dto';

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
  ): Promise<FindProblemBySlugResponseDto> {
    return this.queryBus.execute(new FindProblemBySlugQuery(param.slug));
  }

  @UseGuards(PermissionsGuard([ProblemPermissions.CREATE_PROBLEM]))
  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  @Post()
  async createProblem(
    @Body() body: CreateProblemRequest,

    @Req() request: Request,
  ): Promise<string> {
    const account = request?.account;

    const id = await this.commandBus.execute(
      new CreateProblemCommand(body, account),
    );

    return id.toString();
  }

  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  @Get('find/slug/:slug/solutions')
  async getProblemSolutions(
    @Param() param: FindProblemSolutionsParam,
    @Req() request: Request,
  ): Promise<FindProblemSolutionsResponse> {
    const account = request?.account;

    const results = await this.queryBus.execute(
      new FindProblemSolutionsQuery(param.slug, account),
    );

    return results;
  }
}
