import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProblemCreatedEvent } from 'src/problem/domain/events/problem-created-event';
import { ProblemInjectionToken } from '../injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { Transactional } from 'lib/transactional';

@EventsHandler(ProblemCreatedEvent)
export class ProblemCreatedEventHandler
  implements IEventHandler<ProblemCreatedEvent>
{
  private readonly logger = new Logger(ProblemCreatedEventHandler.name);

  @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;

  @Transactional()
  async handle(event: ProblemCreatedEvent): Promise<void> {
    const foundProblem = await this.problemRepository.findById(event.problemId);

    if (!foundProblem.getSetups()) {
      throw new InternalServerErrorException(
        'Setup cannot be found from problem',
      );
    }
  }
}
