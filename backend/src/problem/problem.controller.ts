import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateProblemRequest } from './dto/request/create-problem-request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProblemCommand } from './commands/create-problem/create-problem.command';
import { UpdateTitleCommand } from './commands/update-title/update-title.command';
import { UpdateTitleRequest } from './dto/request/update-title-request.dto';
import { ProblemsQuery } from './queries/problems.query';
import { ProblemDto } from './dto/problem.dto';
import { ProblemPagination } from './dto/request/problem-pagination.dto';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getProblem(): Promise<void> {}

  @Get()
  async getProblems(
    @Body() problemPagination: ProblemPagination,
  ): Promise<ProblemDto[]> {
    return this.queryBus.execute<ProblemsQuery, ProblemDto[]>(
      new ProblemsQuery(problemPagination),
    );
  }

  @Post()
  async createProblem(
    @Body() createProblemRequest: CreateProblemRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateProblemCommand, void>(
      new CreateProblemCommand(createProblemRequest),
    );
  }

  @Patch(':id/title')
  async updateProblemTitle(
    @Param('id') problemId: string,
    @Body() updateTitleRequest: UpdateTitleRequest,
  ): Promise<void> {
    await this.commandBus.execute<UpdateTitleCommand, void>(
      new UpdateTitleCommand(problemId, updateTitleRequest.title),
    );
  }
}
