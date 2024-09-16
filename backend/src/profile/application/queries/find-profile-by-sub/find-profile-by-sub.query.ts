import { IQuery } from '@nestjs/cqrs';

export class FindProfileBySubQuery implements IQuery {
  constructor(readonly sub: string) {}
}
