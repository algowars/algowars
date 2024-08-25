import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'; // Import necessary classes from the CQRS module
import { CreateEvaluationCommand } from './create-evaluation.command'; // Import the CreateEvaluationCommand
import { AccountEntityRepository } from 'src/account/db/account-entity.repository'; // Import the repository for account entities
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'; // Import common exceptions
import { Judge0SubmissionFactory } from 'src/evaluation/factories/judge0-submission.factory'; // Import the submission factory for Judge0
import { EvaluationService } from 'src/evaluation/services/evaluation.service'; // Import the evaluation service
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository'; // Import the repository for problem entities
import { SubmissionResultTestcaseFactory } from 'src/submission-result/factories/submission-result-testcase/submission-result-testcase.factory'; // Import the submission result testcase factory
import { SubmissionResultFactory } from 'src/submission-result/factories/submission-result.factory'; // Import the submission result factory

// Define the CreateEvaluationHandler class, which handles the CreateEvaluationCommand
@CommandHandler(CreateEvaluationCommand)
export class CreateEvaluationHandler
  implements ICommandHandler<CreateEvaluationCommand> {
  constructor(
    private readonly evaluationService: EvaluationService, // Inject evaluation service
    private readonly problemEntityRepository: ProblemEntityRepository, // Inject problem entity repository
    private readonly accountEntityRepository: AccountEntityRepository, // Inject account entity repository
    private readonly judgeSubmissionFactory: Judge0SubmissionFactory, // Inject Judge0 submission factory
    private readonly submissionResultFactory: SubmissionResultFactory, // Inject submission result factory
    private readonly submissionResultTestcaseFactory: SubmissionResultTestcaseFactory, // Inject submission result testcase factory
    private readonly eventPublisher: EventPublisher, // Inject event publisher
  ) { }

  // Execute the command to create an evaluation
  async execute({
    createEvaluation,
    sub,
  }: CreateEvaluationCommand): Promise<any> {
    // Find the account associated with the provided subscription identifier (sub)
    const account = await this.accountEntityRepository.findBySub(sub);

    if (!account) {
      throw new NotFoundException('Account not found'); // Throw an error if the account is not found
    }

    // Find the problem by its slug and load its related setups and tests
    const problem = await this.problemEntityRepository.findBySlugWithRelations(
      createEvaluation.problemSlug,
    );

    // Check if the problem is properly configured
    if (!problem.getSetups() || !problem.getTests()) {
      throw new InternalServerErrorException(
        'Problem is not properly configured',
      ); // Throw an error if the problem setup is invalid
    }

    // Find the specific problem setup that matches the requested language
    const problemSetup = problem
      .getSetups()
      .find((setup) => setup.getLanguageId() === createEvaluation.languageId);

    if (!problemSetup) {
      throw new NotFoundException(
        'This language is not available for this problem', // Throw an error if the language is not available for the problem
      );
    }

    // Create a submission using the evaluation service and the Judge0 factory
    const tokens = await this.evaluationService.createSubmission(
      this.judgeSubmissionFactory.create(
        problemSetup,
        problem.getTests(),
        createEvaluation.sourceCode,
        createEvaluation.languageId,
      ),
    );

    if (!tokens) {
      throw new InternalServerErrorException('Error creating submission'); // Throw an error if submission creation fails
    }

    // Create test case results for each token returned from the submission
    const testcases = await Promise.all(
      tokens.map(({ token }, index) =>
        this.submissionResultTestcaseFactory.create({
          token,
          order: index, // Set the order for the testcase
          isRandomTestcase: false, // Indicate whether the testcase is random
        }),
      ),
    );

    // Create a submission result using the submission result factory and the event publisher
    const result = this.eventPublisher.mergeObjectContext(
      await this.submissionResultFactory.create({
        languageId: createEvaluation.languageId, // Set the language ID
        isSubmission: true, // Indicate this is a submission
        createdAt: new Date(), // Set the creation timestamp
        updatedAt: new Date(), // Set the update timestamp
        createdBy: account, // Associate the result with the account that created it
        testcases: testcases, // Include the test cases created earlier
      }),
    );

    result.commit(); // Commit the changes to the event publisher
    return result.getId(); // Return the ID of the created result
  }
}
