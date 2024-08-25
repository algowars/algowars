import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateProblemRequest } from './dto/request/create-problem-request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProblemCommand } from './commands/create-problem/create-problem.command';
import { UpdateTitleCommand } from './commands/update-title/update-title.command';
import { UpdateTitleRequest } from './dto/request/update-title-request.dto';
import { ProblemDto } from './dto/problem.dto';
import { ProblemPagination } from './dto/request/problem-pagination.dto';
import { ProblemsPaginationQuery } from './queries/problems-pagination/problems-pagination.query';
import { FindProblemByIdQuery } from './queries/find-problem-by-id/find-problem-by-id.query';
import { PaginationResponse } from 'src/common/pagination/dto/response/pagination-response.dto';
import { FindProblemDto } from './dto/request/find-problem.dto';
import { FindProblemSlugDto } from './dto/request/find-problem-slug.dto';
import { ProblemAggregateDto } from './dto/problem-aggregate.dto';
import { FindProblemAggregateBySlugQuery } from './queries/find-problem-aggregate-by-slug/find-problem-aggregate-by-slug.query';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('find/:id')
  getProblem(@Param() findProblemDto: FindProblemDto): Promise<ProblemDto> {
    return this.queryBus.execute<FindProblemByIdQuery, ProblemDto>(
      new FindProblemByIdQuery(findProblemDto.id),
    );
  }

  @Get('slug')
  getProblemAggregateBySlug(
    @Query() findProblemSlug: FindProblemSlugDto,
  ): Promise<ProblemAggregateDto> {
    return this.queryBus.execute<
      FindProblemAggregateBySlugQuery,
      ProblemAggregateDto
    >(new FindProblemAggregateBySlugQuery(findProblemSlug));
  }

  @Get()
  getProblems(
    @Query() problemPagination: ProblemPagination,
  ): Promise<PaginationResponse<ProblemDto>> {
    return this.queryBus.execute<
      ProblemsPaginationQuery,
      PaginationResponse<ProblemDto>
    >(new ProblemsPaginationQuery(problemPagination));
  }

  @Post()
  async createProblem(
    @Body() createProblemRequest: CreateProblemRequest,
  ): Promise<string> {
    const problemId = await this.commandBus.execute<
      CreateProblemCommand,
      string
    >(new CreateProblemCommand(createProblemRequest));

    return problemId;
  }

  @Patch(':id/title')
  async updateProblemTitle(
    @Param('id') problemId: string,
    @Body() updateTitleRequest: UpdateTitleRequest,
  ): Promise<void> {
    this.commandBus.execute<UpdateTitleCommand, void>(
      new UpdateTitleCommand(problemId, updateTitleRequest.title),
    );
  }
}
