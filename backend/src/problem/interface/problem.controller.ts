import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from '../application/queries/find-problem-by-slug-query/find-problem-by-slug.query';
import { FindProblemBySlugRequestParam } from './dto/request/find-problem-by-slug-request-param.dto';
import { FindProblemBySlugResponseDto } from './dto/response/find-problem-by-slug-response.dto';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { ProblemPermissions } from '../application/permissions/problem-permissions';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { CreateProblemRequest } from './dto/request/create-problem.dto';

@Controller('v1/problem')
export class ProblemController {
  constructor(private readonly queryBus: QueryBus) {}

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
  ): Promise<CreateProblemResult> {}
}
