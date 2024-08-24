import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTitleCommand } from './update-title.command';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';

/**
 * This class handles the UpdateTitleCommand.
 * It is responsible for executing the logic required to update the title of a problem.
 */
@CommandHandler(UpdateTitleCommand)
export class UpdateTitleHandler implements ICommandHandler<UpdateTitleCommand> {
  /**
   * Constructor that injects dependencies needed for handling the command.
   * @param problemEntityRepository - Repository to interact with problem entities in the database.
   * @param eventPublisher - Publisher to handle domain events.
   */
  constructor(
    private readonly problemEntityRepository: ProblemEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) { }

  /**
   * Executes the command to update the title of a problem.
   * @param problemId - The ID of the problem to be updated.
   * @param title - The new title to be assigned to the problem.
   * @returns A promise that resolves when the operation is complete.
   */
  async execute({ problemId, title }: UpdateTitleCommand): Promise<void> {
    // Retrieve the problem from the repository and wrap it with event publishing capabilities.
    const problem = this.eventPublisher.mergeObjectContext(
      await this.problemEntityRepository.findOneById(problemId),
    );

    // Update the title of the problem.
    problem.updateTitle(title);

    // Replace the updated problem in the repository to persist the changes.
    await this.problemEntityRepository.findOneAndReplaceById(
      problemId,
      problem,
    );

    // Commit the problem to trigger any relevant domain events.
    problem.commit();
  }
}
