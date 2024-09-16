import { IQueryResult } from '@nestjs/cqrs';

export class FindProfileBySubResult implements IQueryResult {
  readonly sub: string;
}
