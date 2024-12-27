import { IEvent } from '@nestjs/cqrs';
import { Id } from 'src/common/domain/id';

export class SubmissionCreatedEvent implements IEvent {
  constructor(readonly submissionId: Id) {}
}
