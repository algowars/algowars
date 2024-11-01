import { IQueryResult } from '@nestjs/cqrs';

export class GetProblemSetupResult implements IQueryResult {
  readonly initialCode: string;
  readonly initialSolution: string;
  readonly testFile: string;
}
