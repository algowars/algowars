import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Language } from 'src/problem/domain/language';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { Problem } from 'src/problem/domain/problem';
import { CreateProblemRequest } from 'src/problem/interface/dto/request/create-problem.dto';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { Account } from 'src/account/domain/account';
import {
  ProblemSetup,
  ProblemSetupImplementation,
} from 'src/problem/domain/problem-setup';
import { ProblemStatus } from 'src/problem/domain/problem-status';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { SubmissionStatus } from 'src/submission/domain/submission-status';
import { TestImplementation } from 'src/problem/domain/test';
import { SubmissionResultImplementation } from 'src/submission/domain/submission-result';
import { TestType } from 'src/problem/domain/test-type';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand, Id>
{
  @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject()
  private readonly problemFactory: ProblemFactory;
  @Inject(ProblemInjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateProblemCommand): Promise<Id> {
    const languageId = new IdImplementation(
      command.createProblemRequest.languageId,
    );
    const additionalTestFileId = new IdImplementation(
      command.createProblemRequest.additionalTestFileId,
    );

    const { language, additionalTestFile } =
      await this.getLanguageWithAdditionalTestFile(
        languageId,
        additionalTestFileId,
      );

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    if (!additionalTestFile) {
      throw new NotFoundException('Additional test file not found');
    }

    const executionContext = this.contextFactory.createContext(language);

    const buildRequest = await executionContext.build(
      `${command.createProblemRequest.solution}
${command.createProblemRequest.test}`,
      additionalTestFile,
    );

    const executionResult = await executionContext.execute(buildRequest);

    const problem = await this.createProblem(
      command.createProblemRequest,
      command.account,
    );

    const setups = await this.createSetup(
      problem,
      language,
      additionalTestFile,
      command.createProblemRequest,
    );

    const submission = await this.createSubmission(
      language,
      problem,
      `${command.createProblemRequest.solution}
${command.createProblemRequest.test}`,
      command.account,
      executionContext.getEngine(),
      executionResult,
    );

    setups.setSolution(submission);

    await this.problemRepository.saveAggregate(problem, setups, submission);

    problem.commit();

    return problem.getId();
  }

  private getLanguageWithAdditionalTestFile(
    languageId: Id,
    additionalTestFileId: Id,
  ): Promise<{
    language: Language;
    additionalTestFile: AdditionalTestFile;
  }> {
    return this.languageRepository.findByIdWithTestFile(
      languageId,
      additionalTestFileId,
    );
  }

  private async createProblem(
    createProblemRequest: CreateProblemRequest,
    account: Account,
  ): Promise<Problem> {
    const problemId = await this.problemRepository.newId();

    return this.problemFactory.create({
      ...createProblemRequest,
      id: problemId,
      createdBy: account,
      status: ProblemStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 1,
    });
  }

  private async createSetup(
    problem: Problem,
    language: Language,
    additionalTestFile: AdditionalTestFile,
    createProblemRequest: CreateProblemRequest,
  ): Promise<ProblemSetup> {
    const testType = this.determineTestType({
      input: createProblemRequest.input,
      expectedOutput: createProblemRequest.expectedOutput,
    });

    return new ProblemSetupImplementation({
      problem,
      language,
      initialCode: createProblemRequest.initialCode,
      tests: [
        new TestImplementation({
          id: new IdImplementation(await this.problemRepository.newId()),
          code: createProblemRequest.test,
          input: createProblemRequest.input ?? null,
          expectedOutput: createProblemRequest.expectedOutput ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          version: 0,
          additionalTestFile,
          testType,
        }),
      ],
    });
  }

  private determineTestType(test: {
    input?: string;
    expectedOutput?: string;
  }): TestType {
    if (test.input && test.expectedOutput) {
      return TestType.JUDGE0;
    }
    return TestType.UVU;
  }

  private async createSubmission(
    language: Language,
    problem: Problem,
    sourceCode: string,
    createdBy: Account,
    codeExecutionContext: CodeExecutionEngines,
    executionResult: any,
  ): Promise<Submission> {
    const submissionId = await this.submissionRepository.newId();

    return this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode,
      createdBy,
      codeExecutionEngine: codeExecutionContext,
      problem,
      status: SubmissionStatus.POLLING,
      results: [
        new SubmissionResultImplementation({
          ...executionResult,
          status: SubmissionStatus.POLLING,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
    });
  }
}
