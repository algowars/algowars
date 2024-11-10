import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { InjectionToken as ProblemInjectionToken } from '../../../../problem/application/injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { LanguageRepository } from 'src/problem/domain/language-repository';

@CommandHandler(CreateSubmissionCommand)
export class CreateSubmissionHandler
  implements ICommandHandler<CreateSubmissionCommand, Id>
{
  @Inject(InjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject(ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY)
  private readonly problemSetupRepository: ProblemSetupRepository;
  @Inject(ProblemInjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const setup = await this.problemSetupRepository.findByProblemSlug(
      command.request.problemSlug,
      command.request.languageId,
    );

    const language = await this.languageRepository.findById(
      command.request.languageId,
    );

    if (!setup || !language) {
      throw new NotFoundException('Language not found');
    }

    const executionContext = this.contextFactory.createContext(language);

    const builtRequest = await executionContext.build(
      `${command.request.sourceCode}
${setup.getTests()[0].getCode()}`,
      setup.getTests()[0].getAdditionalTestFile(),
    );
    const executionResult = await executionContext.execute(builtRequest);

    const submissionId = await this.submissionRepository.newId();
    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode: command.request.sourceCode,
      createdBy: command.account,
      results: [executionResult],
    });

    await this.submissionRepository.save(submission);

    submission.commit();

    return submission.getId();
  }
}
