import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { SubmissionInjectionToken } from '../../injection-token';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@CommandHandler(CreateSubmissionCommand)
export class CreateSubmissionHandler
  implements ICommandHandler<CreateSubmissionCommand, Id>
{
  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject(ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY)
  private readonly problemSetupRepository: ProblemSetupRepository;
  @Inject(ProblemInjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const problem = await this.problemRepository.findBySlug(
      command.request.problemSlug,
    );

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

    console.log('EXECUTION RESULT: ', executionResult);

    const submissionId = await this.submissionRepository.newId();
    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode: command.request.sourceCode,
      createdBy: command.account,
      results: [
        {
          ...executionResult,
          status: SubmissionStatus.POLLING,
        },
      ],
      codeExecutionContext: executionContext.getEngine(),
      problem,
    });

    await this.submissionRepository.save(submission);

    submission.create();

    submission.commit();

    return submission.getId();
  }
}
