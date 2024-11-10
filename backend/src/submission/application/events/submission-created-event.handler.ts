import { EventsHandler, IEvent } from '@nestjs/cqrs';
import { SubmissionCreatedEvent } from 'src/submission/domain/events/submission-created-event';

@EventsHandler(SubmissionCreatedEvent)
export class SubmissionCreatedEventHandler
  implements IEvent<SubmissionCreatedEvent> {}
