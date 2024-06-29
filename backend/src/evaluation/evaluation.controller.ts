import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateEvaluationAnonymousCommand } from './commands/create-evaluation-anonymous/create-evaluation-anonymous.command';
import { CreateEvaluationAnonymous } from './dto/request/create-evaluation-anonymous.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';

@Controller('v1/evaluation')
export class EvaluationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Post('anonymous')
  async evaluateAnonymous(
    @Body()
    createEvaluationAnonymous: CreateEvaluationAnonymous,
    @Req() request: Request,
  ): Promise<string> {
    const sub = request.auth.payload.sub;
    return this.commandBus.execute<CreateEvaluationAnonymousCommand, string>(
      new CreateEvaluationAnonymousCommand(createEvaluationAnonymous, sub),
    );
  }

  @Post()
  async evaluate(): Promise<void> {}
}
