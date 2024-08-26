import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProblemRequest } from './dto/request/create-problem-request.dto';
import { CreateProblemCommand } from './commands/create-problem/create-problem.command';

@Injectable()
export class ProblemService {
  constructor(private commandBus: CommandBus) {}

  create(createProblemRequest: CreateProblemRequest): Promise<string> {
    return this.commandBus.execute<CreateProblemCommand, string>(
      new CreateProblemCommand(createProblemRequest),
    );
  }
}
