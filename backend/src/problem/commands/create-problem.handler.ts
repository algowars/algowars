import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemCommand } from './create-problem.command';
import { ProblemFactory } from '../problem.factory';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand>
{
  constructor(
    private readonly problemFactory: ProblemFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createProblemRequest }: CreateProblemCommand): Promise<void> {
    const { title, question, slug, rating } = createProblemRequest;
    const problem = this.eventPublisher.mergeObjectContext(
      await this.problemFactory.create(title, question, slug, rating),
    );
    problem.commit();
  }
}