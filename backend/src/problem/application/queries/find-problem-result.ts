import { IQueryResult } from '@nestjs/cqrs';

export class FindProblemResult implements IQueryResult {
  constructor(readonly problem: Readonly<{}>) {}
}
