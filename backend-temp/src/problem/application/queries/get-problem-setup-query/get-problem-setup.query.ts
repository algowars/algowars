import { IQuery } from '@nestjs/cqrs';

export class GetProblemSetupQuery implements IQuery {
  constructor(readonly languageId: number) {}
}
