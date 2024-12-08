import { IEvent } from '@nestjs/cqrs';

export class ProblemCreatedEvent implements IEvent {
  constructor(readonly problemId: string) {}
}
