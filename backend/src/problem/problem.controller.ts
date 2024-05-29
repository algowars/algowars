import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemRequest } from './dto/request/create-problem-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProblemCommand } from './commands/create-problem.command';

@Controller('problem')
export class ProblemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getProblem(@Param('id') problemId: string): Promise<void> {}

  @Get()
  async getProblems(): Promise<void> {}

  @Post()
  async createProblem(
    @Body() createProblemRequest: CreateProblemRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateProblemCommand, void>(
      new CreateProblemCommand(createProblemRequest),
    );
  }
}
