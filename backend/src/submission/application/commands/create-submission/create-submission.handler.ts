import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';

@CommandHandler(CreateSubmissionCommand)
export class CreateSubmissionHandler
  implements ICommandHandler<CreateSubmissionCommand, Id>
{
  @Inject(InjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const submission = this.submissionFactory.create({
      ...command,
      id: await this.submissionRepository.findById(),
    });
  }
}
