import { IQuery } from '@nestjs/cqrs';

export class FindAccountBySubQuery implements IQuery {
  constructor(readonly sub: string) {}
}
