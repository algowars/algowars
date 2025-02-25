import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubmissionCommand } from './create-submission.command';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SubmissionInjectionToken } from '../../injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { Problem } from 'src/problem/domain/problem';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';
import { ProblemSetup } from 'src/problem/domain/problem-setup';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { Language } from 'src/problem/domain/language';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { CodeExecutionContextFactory } from 'lib/code-execution/code-execution-context-factory';
import { CodeExecutionContext } from 'lib/code-execution/code-execution-context';

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
  @Inject(ProblemInjectionToken.LANGUAGE_REPOSITORY)
  private readonly languageRepository: LanguageRepository;
  @Inject()
  private readonly contextFactory: CodeExecutionContextFactory;

  async execute(command: CreateSubmissionCommand): Promise<Id> {
    const problem = await this.findProblem(command.request.problemSlug);

    if (!problem) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    const language = await this.languageRepository.findById(
      new IdImplementation(command.request.languageId),
    );

    if (!language) {
      throw new NotFoundException(ProblemErrorMessage.LANGUAGE_NOT_FOUND);
    }

    const problemAggregate = await this.findProblemAggregate(problem, language);

    if (!problemAggregate) {
      throw new NotFoundException('Problem Setup not found');
    }

    const executionContext = this.buildContext(language);

    if (!executionContext) {
      throw new InternalServerErrorException(
        'Execution Context cannot be found',
      );
    }
  }

  private findProblem(problemSlug: string): Promise<Problem> {
    return this.problemRepository.findBySlug(problemSlug);
  }

  private findProblemAggregate(
    problem: Problem,
    language: Language,
  ): Promise<ProblemSetup> {
    return this.problemSetupRepository.findById(
      problem.getId().toString(),
      language.getId().toNumber(),
    );
  }

  private buildContext(language: Language): CodeExecutionContext {
    return this.contextFactory.createContext(language);
  }

  private createSubmission() {}
}

// @CommandHandler(CreateSubmissionCommand)
// export class CreateSubmissionHandler
//   implements ICommandHandler<CreateSubmissionCommand, Id>
// {
//   @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
//   private readonly submissionRepository: SubmissionRepository;
//   @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
//   private readonly problemRepository: ProblemRepository;
//   @Inject(ProblemInjectionToken.PROBLEM_SETUP_REPOSITORY)
//   private readonly problemSetupRepository: ProblemSetupRepository;
//   @Inject()
//   private readonly submissionFactory: SubmissionFactory;
//   @Inject()
//   private readonly contextFactory: CodeExecutionContextFactory;

//   async execute(command: CreateSubmissionCommand): Promise<Id> {
//     const foundProblem = await this.getProblem(command.request.problemSlug);

//     if (!foundProblem) {
//       throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
//     }

//     const setupAggregate = await this.getSetupAggregate(
//       foundProblem.getId(),
//       command.request.languageId,
//     );

//     if (!setupAggregate) {
//       throw new NotFoundException(ProblemErrorMessage.SETUP_NOT_FOUND);
//     }

//     const executionContext = this.createCodeExecutionContext(
//       setupAggregate.getLanguage(),
//     );

//     const results = await this.executeCode(
//       executionContext,
//       command.request.sourceCode,
//       setupAggregate.getTests(),
//       setupAggregate.getLanguage(),
//     );

//     const submission = await this.createSubmission(
//       setupAggregate.getLanguage(),
//       command.request.sourceCode,
//       command.account,
//       results,
//       setupAggregate.getProblem(),
//       setupAggregate.getTests(),
//     );

//     return submission.getId();
//   }

//   private getProblem(slug: string): Promise<Problem> {
//     return this.problemRepository.findBySlug(slug);
//   }

//   private getSetupAggregate(
//     problemId: Id,
//     languageId: number,
//   ): Promise<ProblemSetup> {
//     return this.problemSetupRepository.findById(
//       problemId.toString(),
//       languageId,
//     );
//   }

//   private createCodeExecutionContext(language: Language): CodeExecutionContext {
//     return this.contextFactory.createContext(language);
//   }

//   private async executeCode(
//     executionContext: CodeExecutionContext,
//     sourceCode: string,
//     tests: Test[],
//     language: Language,
//   ): Promise<CodeExecutionResponse[]> {
//     const contexts = tests.map((test) => ({
//       sourceCode: test.getCode()
//         ? `${sourceCode}\n${test.getCode()}`
//         : sourceCode,
//       input: test.getInput(),
//       expectedOutput: test.getExpectedOutput(),
//       languageId: language.getId().toNumber(),
//       additionalTestFiles: test.getAdditionalTestFile(),
//     }));

//     const batchRequests = await executionContext.batchBuild(contexts);

//     console.log('BATCH REQUESTS: ', batchRequests);

//     return executionContext.batchExecute(batchRequests);
//   }

//   private async createSubmission(
//     language: Language,
//     sourceCode: string,
//     createdBy: Account,
//     results: any[],
//     problem: Problem,
//     tests: Test[],
//   ): Promise<Submission> {
//     const submissionId = await this.submissionRepository.newId();

//     const submission = this.submissionFactory.create({
//       id: submissionId,
//       language,
//       sourceCode,
//       createdBy,
//       results: results.map(
//         (result, index) =>
//           new SubmissionResultImplementation({
//             token: result.token,
//             testType: tests[index].getTestType(),
//             status: SubmissionStatus.POLLING,
//           }),
//       ),
//       status: SubmissionStatus.POLLING,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       deletedAt: null,
//       version: 1,
//       codeExecutionEngine: CodeExecutionEngines.JUDGE0,
//       problem,
//     });

//     await this.submissionRepository.save(submission);

//     submission.create();
//     submission.commit();

//     return submission;
//   }
// }
