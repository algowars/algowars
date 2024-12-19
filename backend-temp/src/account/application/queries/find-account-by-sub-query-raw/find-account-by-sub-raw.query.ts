import { IQuery } from '@nestjs/cqrs';

export class FindAccountBySubRawQuery implements IQuery {
  constructor(readonly sub: string) {}
}
