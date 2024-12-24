import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id } from 'src/common/domain/id';
import { Problem } from 'src/problem/domain/problem';
import { CodeExecutionContext } from 'lib/code-execution/code-execution-context';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { ProblemSetup } from 'src/problem/domain/problem-setup';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { Language } from 'src/problem/domain/language';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { SubmissionInjectionToken } from '../../injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { Account } from 'src/account/domain/account';
import { SubmissionStatus } from 'src/submission/domain/submission-status';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { Submission } from 'src/submission/domain/submission';

@CommandHandler(CreateSubmissionCommand)
export class CreateSubmissionHandler
  implements ICommandHandler<CreateSubmissionCommand, Id>
{
  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject(ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY)
  private readonly problemSetupRepository: ProblemSetupRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const foundProblem = await this.getProblem(command.request.problemSlug);

    if (!foundProblem) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    const setupAggregate = await this.getSetupAggregate(
      foundProblem.getId(),
      command.request.languageId,
    );

    if (!setupAggregate) {
      throw new NotFoundException(ProblemErrorMessage.SETUP_NOT_FOUND);
    }

    const executionContext = this.createCodeExecutionContext(
      setupAggregate.getLanguage(),
    );

    const results = await this.executeCode(
      executionContext,
      `${command.request.sourceCode}
      ${setupAggregate.getTests()[0].getCode()}`,
      setupAggregate.getTests()[0].getAdditionalTestFile(),
    );

    const submission = await this.createSubmission(
      setupAggregate.getLanguage(),
      command.request.sourceCode,
      command.account,
      results,
      setupAggregate.getProblem(),
    );

    return submission.getId();
  }

  private getProblem(slug: string): Promise<Problem> {
    return this.problemRepository.findBySlug(slug);
  }

  private getSetupAggregate(
    problemId: Id,
    languageId: number,
  ): Promise<ProblemSetup> {
    return this.problemSetupRepository.findById(
      problemId.toString(),
      languageId,
    );
  }

  private createCodeExecutionContext(language: Language): CodeExecutionContext {
    return this.contextFactory.createContext(language);
  }

  private async executeCode(
    executionContext: CodeExecutionContext,
    code: string,
    additionalTestFile: AdditionalTestFile,
  ) {
    const builtRequest = await executionContext.build(code, additionalTestFile);

    return executionContext.execute(builtRequest);
  }

  private async createSubmission(
    language: Language,
    sourceCode: string,
    createdBy: Account,
    results: any,
    problem: Problem,
  ): Promise<Submission> {
    const submissionId = await this.submissionRepository.newId();

    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode,
      createdBy,
      results: [
        {
          ...results,
          status: SubmissionStatus.POLLING,
        },
      ],
      status: SubmissionStatus.POLLING,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 1,
      codeExecutionEngine: CodeExecutionEngines.JUDGE0,
    });

    await this.submissionRepository.save(submission);

    submission.commit();

    return submission;
  }
}
