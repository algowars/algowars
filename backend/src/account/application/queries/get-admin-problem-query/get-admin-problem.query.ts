import { IQuery } from '@nestjs/cqrs';

export class GetAdminProblemQuery implements IQuery {
  constructor(readonly slug: string) {}
}
