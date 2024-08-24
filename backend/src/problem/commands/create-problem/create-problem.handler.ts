import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProblemFactory } from '../../factories/problem.factory';
import { CreateProblemCommand } from './create-problem.command';

/**
 * This class handles the CreateProblemCommand.
 * It is responsible for executing the logic required to create a new problem.
 */
@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand> {
  /**
   * Constructor that injects dependencies needed for handling the command.
   * @param problemFactory - Factory to create problem instances.
   * @param eventPublisher - Publisher to handle domain events.
   */
  constructor(
    private readonly problemFactory: ProblemFactory,
    private readonly eventPublisher: EventPublisher,
  ) { }

  /**
   * Executes the command to create a new problem.
   * @param createProblemRequest - The request object containing the data required to create the problem.
   * @returns A promise that resolves to the ID of the newly created problem.
   */
  async execute({
    createProblemRequest,
  }: CreateProblemCommand): Promise<string> {
    // Create a new problem instance using the factory and wrap it with event publishing capabilities.
    const problem = this.eventPublisher.mergeObjectContext(
      await this.problemFactory.create(createProblemRequest),
    );

    // Commit the problem to persist the changes and trigger any relevant domain events.
    problem.commit();

    // Return the ID of the newly created problem.
    return problem.getId();
  }
}
