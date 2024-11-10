import { IEvent } from '@nestjs/cqrs';

export class SubmissionCreatedEvent implements IEvent {
  constructor(readonly submissionId: string) {}
}
