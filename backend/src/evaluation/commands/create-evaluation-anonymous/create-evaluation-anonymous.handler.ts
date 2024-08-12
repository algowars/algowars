import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'; // Import necessary CQRS classes
import { CreateEvaluationAnonymousCommand } from './create-evaluation-anonymous.command'; // Import the command
import { EvaluationService } from 'src/evaluation/services/evaluation.service'; // Import the evaluation service
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository'; // Import the problem repository
import { Judge0SubmissionFactory } from 'src/evaluation/factories/judge0-submission.factory'; // Import the submission factory
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'; // Import exceptions for error handling
import { SubmissionResultFactory } from 'src/submission-result/factories/submission-result.factory'; // Import the submission result factory
import { SubmissionResultTestcaseFactory } from 'src/submission-result/factories/submission-result-testcase/submission-result-testcase.factory'; // Import the testcase factory
import { AccountEntityRepository } from 'src/account/db/account-entity.repository'; // Import the account repository

// Define the command handler for creating an anonymous evaluation
@CommandHandler(CreateEvaluationAnonymousCommand)
export class CreateEvaluationAnonymousHandler
  implements ICommandHandler<CreateEvaluationAnonymousCommand> {
  constructor(
    private readonly evaluationService: EvaluationService, // Inject evaluation service
    private readonly problemEntityRepository: ProblemEntityRepository, // Inject problem repository
    private readonly accountEntityRepository: AccountEntityRepository, // Inject account repository
    private readonly judgeSubmissionFactory: Judge0SubmissionFactory, // Inject submission factory
    private readonly submissionResultFactory: SubmissionResultFactory, // Inject submission result factory
    private readonly submissionResultTestcaseFactory: SubmissionResultTestcaseFactory, // Inject testcase factory
    private readonly eventPublisher: EventPublisher, // Inject event publisher for domain events
  ) { }

  // Handle the command to create an anonymous evaluation
  async execute({
    createEvaluationAnonymous, // The evaluation data
    sub, // The subscription identifier
  }: CreateEvaluationAnonymousCommand): Promise<string> {
    // Retrieve the account associated with the subscription
    const account = await this.accountEntityRepository.findBySub(sub);

    if (!account) {
      throw new NotFoundException('Account not found'); // Throw error if account not found
    }

    // Retrieve the problem using the provided slug
    const problem = await this.problemEntityRepository.findBySlugWithRelations(
      createEvaluationAnonymous.problemSlug,
    );

    if (!problem.getSetups() || !problem.getTests()) {
      throw new InternalServerErrorException(
        'Problem is not properly configured', // Throw error if problem setup is invalid
      );
    }

    // Find the appropriate problem setup based on the language ID
    const problemSetup = problem
      .getSetups()
      .find(
        (setup) =>
          setup.getLanguageId() === createEvaluationAnonymous.languageId,
      );

    if (!problemSetup) {
      throw new NotFoundException(
        'This language is not available for this problem', // Throw error if language is not supported
      );
    }

    // Create a submission for the evaluation
    const tokens = await this.evaluationService.createSubmission(
      this.judgeSubmissionFactory.create(
        problemSetup,
        problem.getTests(),
        createEvaluationAnonymous.sourceCode,
        createEvaluationAnonymous.languageId,
      ),
    );

    if (!tokens) {
      throw new InternalServerErrorException('Error creating submission'); // Throw error if submission creation fails
    }

    // Create testcases based on the submission tokens
    const testcases = await Promise.all(
      tokens.map(({ token }, index) =>
        this.submissionResultTestcaseFactory.create({
          token,
          order: index,
          isRandomTestcase: false,
        }),
      ),
    );

    // Create a submission result and commit it to the event publisher
    const result = this.eventPublisher.mergeObjectContext(
      await this.submissionResultFactory.create({
        languageId: createEvaluationAnonymous.languageId,
        isSubmission: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: account,
        testcases: testcases,
      }),
    );

    result.commit(); // Commit the result to the event publisher
    return result.getId(); // Return the ID of the created submission result
  }
}
