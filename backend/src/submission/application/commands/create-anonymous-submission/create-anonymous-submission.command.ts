import { ICommand } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';

export class CreateAnonymousSubmissionCommand implements ICommand {
  constructor(
    readonly account: Account,
    readonly code: string,
    readonly languageId: number,
    readonly additionalFilesId: string,
  ) {}
}
