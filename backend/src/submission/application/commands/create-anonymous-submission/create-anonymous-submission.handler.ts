import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAnonymousSubmissionCommand } from './create-anonymous-submission.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';

@CommandHandler(CreateAnonymousSubmissionCommand)
export class CreateAnonymousSubmissionHandler
  implements ICommandHandler<CreateAnonymousSubmissionCommand, Id>
{
  @Inject(InjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject(InjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateAnonymousSubmissionCommand): Promise<Id> {
    const language = await this.languageRepository.findById(command.languageId);

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    const executionContext = this.contextFactory.createContext(language);

    const builtRequest = await executionContext.build(command.code);
    const executionResult = await executionContext.execute(builtRequest);

    const submissionId = await this.submissionRepository.newId();
    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode: command.sourceCode,
      createdBy: command.account,
      results: [executionResult],
    });

    await this.submissionRepository.save(submission);

    submission.commit();

    return submission.getId();
  }
}
