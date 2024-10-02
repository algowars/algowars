import { ICommand } from '@nestjs/cqrs';
import { CreateSubmissionRequest } from 'src/submission/interface/dto/request/create-submission-request.dto';

export class CreateSubmissionCommand implements ICommand {
  constructor(
    readonly sub: string,
    readonly request: CreateSubmissionRequest,
  ) {}
}
