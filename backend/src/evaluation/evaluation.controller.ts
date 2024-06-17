import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEvaluationAnonymousCommand } from './commands/create-evaluation-anonymous/create-evaluation-anonymous.command';
import { CreateEvaluationAnonymous } from './dto/request/create-evaluation-anonymous.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';

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
  ): Promise<{ token: string }[]> {
    return this.commandBus.execute<
      CreateEvaluationAnonymousCommand,
      { token: string }[]
    >(new CreateEvaluationAnonymousCommand(createEvaluationAnonymous));
  }

  @Post()
  async evaluate(): Promise<void> {}
}
