import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('v1/problem')
export class ProblemController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('find/:slug')
  async findProblemBySlug() {}
}
