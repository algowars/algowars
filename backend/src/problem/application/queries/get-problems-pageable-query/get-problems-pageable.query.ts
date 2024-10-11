import { IQuery } from '@nestjs/cqrs';

export class GetProblemsPageableQuery implements IQuery {
  constructor(
    readonly page: number,
    readonly size: number,
    readonly timestamp: Date,
  ) {}
}
