import { ICommand } from '@nestjs/cqrs';
import { CreateProblemRequest } from 'src/problem/interface/dto/request/create-problem.dto';

export class CreateProblemCommand implements ICommand {
  constructor(readonly createProblemRequest: CreateProblemRequest) {}
}
