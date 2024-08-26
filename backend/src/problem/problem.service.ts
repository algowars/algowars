import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ProblemService {
  constructor(private commandBus: CommandBus) {}
}
