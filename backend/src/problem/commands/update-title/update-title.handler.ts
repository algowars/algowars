import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTitleCommand } from './update-title.command';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';

@CommandHandler(UpdateTitleCommand)
export class UpdateTitleHandler implements ICommandHandler<UpdateTitleCommand> {
  constructor(
    private readonly problemEntityRepository: ProblemEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ problemId, title }: UpdateTitleCommand): Promise<void> {
    const problem = this.eventPublisher.mergeObjectContext(
      await this.problemEntityRepository.findOneById(problemId),
    );

    problem.updateTitle(title);
    await this.problemEntityRepository.findOneAndReplaceById(
      problemId,
      problem,
    );
    problem.commit();
  }
}
