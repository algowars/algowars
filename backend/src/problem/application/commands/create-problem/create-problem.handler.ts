import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { Id } from 'src/common/domain/id';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { InjectionToken as SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { Transactional } from 'lib/transactional';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { AdditionalTestFileRepository } from 'src/problem/domain/additional-test-file-repository';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { ProblemStatus } from 'src/problem/domain/problem-status';
import { RUNTIME_ERROR_STATUSES } from 'lib/code-execution/judge0/judge0-status';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand, Id>
{
  @Inject(InjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;
  @Inject()
  private readonly problemFactory: ProblemFactory;
  @Inject(InjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject(InjectionToken.ADDITIONAL_TEST_FILE_REPOSITORY)
  private readonly additionalTestFileRepository: AdditionalTestFileRepository;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;
  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;
  @Inject()
  private readonly submissionFactory: SubmissionFactory;

  @Transactional()
  async execute(command: CreateProblemCommand): Promise<Id> {
    const language = await this.languageRepository.findById(
      command.createProblemRequest.languageId,
    );

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    const additionalTestFile = await this.additionalTestFileRepository.findById(
      command.createProblemRequest.additionalTestFileId,
    );

    if (!additionalTestFile) {
      throw new NotFoundException('Additional Test File not found');
    }

    // create submission and run submission
    const executionContext = this.contextFactory.createContext(language);

    const buildRequest = await executionContext.build(
      `${command.createProblemRequest.solution}
${command.createProblemRequest.test}`,
      additionalTestFile,
    );

    const executionResult = await executionContext.execute(buildRequest);

    const submissionId = await this.submissionRepository.newId();
    const submission = this.submissionFactory.create({
      id: submissionId,
      language,
      sourceCode: command.createProblemRequest.solution,
      createdBy: command.account,
      results: [
        {
          ...executionResult,
          status: SubmissionStatus.POLLING,
        },
      ],
      codeExecutionContext: executionContext.getEngine(),
    });
    await this.submissionRepository.save(submission);

    submission.create();
    submission.commit();

    const problemId = await this.problemRepository.newId();

    const problem = this.problemFactory.create({
      ...command.createProblemRequest,
      id: problemId,
      createdBy: command.account,
      setups: [
        {
          problemId,
          languageId: language.getId().toNumber(),
          initialCode: command.createProblemRequest.initialCode,
          solution: submission,
          tests: [
            {
              id: await this.problemRepository.newId(),
              code: command.createProblemRequest.test,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              version: 0,
              additionalTestFile: {
                id: additionalTestFile.getId(),
                fileName: additionalTestFile.getFileName(),
                language: additionalTestFile.getLanguage(),
                initialTestFile: additionalTestFile.getInitialTestFile(),
                name: additionalTestFile.getName(),
              },
            },
          ],
        },
      ],
      status: ProblemStatus.PENDING,
    });

    await this.problemRepository.save(problem);

    problem.commit();

    return problem.getId();
  }
}
