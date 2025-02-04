import { IQuery } from '@nestjs/cqrs';

export class FindRushByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
