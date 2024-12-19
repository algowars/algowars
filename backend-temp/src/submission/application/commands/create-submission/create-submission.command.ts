import { ICommand } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';
import { CreateSubmissionRequest } from 'src/submission/interface/dto/request/create-submission-request.dto';

export class CreateSubmissionCommand implements ICommand {
  constructor(
    readonly account: Account,
    readonly request: CreateSubmissionRequest,
  ) {}
}
