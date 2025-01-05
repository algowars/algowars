import { IQuery } from '@nestjs/cqrs';

export class FindSubmissionByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
