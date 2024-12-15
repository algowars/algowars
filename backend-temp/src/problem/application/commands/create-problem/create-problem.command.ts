import { ICommand } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';
import { CreateProblemRequest } from 'src/problem/interface/dto/request/create-problem.dto';

export class CreateProblemCommand implements ICommand {
  constructor(
    readonly createProblemRequest: CreateProblemRequest,
    readonly account: Account,
  ) {}
}
