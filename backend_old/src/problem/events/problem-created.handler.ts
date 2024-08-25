import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProblemCreatedEvent } from './problem-created.event';

@EventsHandler(ProblemCreatedEvent)
export class ProblemCreatedHandler
  implements IEventHandler<ProblemCreatedEvent>
{
  async handle({ problemId }: ProblemCreatedEvent): Promise<void> {
    console.log('PROBLEM ID', problemId);
  }
}
