import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Transactional } from 'lib/transactional';
import { SubmissionCreatedEvent } from 'src/submission/domain/events/submission-created-event';
import { InjectionToken as SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { IdImplementation } from 'src/common/domain/id';

@EventsHandler(SubmissionCreatedEvent)
export class SubmissionCreatedEventHandler
  implements IEventHandler<SubmissionCreatedEvent>
{
  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly codeExecutionContextFactory: CodeExecutionContextFactory;
  @Transactional()
  async handle(event: SubmissionCreatedEvent): Promise<void> {
    console.log('EVENT HERE: ', event);
    const foundSubmission = await this.submissionRepository.findById(
      new IdImplementation(event.submissionId),
    );

    console.log('FOUND SUBMISSION: ', foundSubmission);

    const codeExecutionContext = null;
  }
}
