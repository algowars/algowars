import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';

@CommandHandler(CreateSubmissionCommand)
export class CreateSubmissionHandler
  implements ICommandHandler<CreateSubmissionCommand, Id>
{
  @Inject(InjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject(InjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const language = await this.languageRepository.findById(
      command.request.languageId,
    );

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    const executionContext = this.contextFactory.createContext(language);

    const builtRequest = executionContext.build(command.request.sourceCode);

    const executionResult = await executionContext.execute(builtRequest);

    console.log('RESULT: ', executionResult);

    const submissionId = await this.submissionRepository.newId();

    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode: command.request.sourceCode,
      createdBy: command.account,
    });

    await this.submissionRepository.save(submission);

    submission.commit();

    return submission.getId();
  }
}
