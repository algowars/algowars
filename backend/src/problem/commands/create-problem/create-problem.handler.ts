import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProblemFactory } from '../../factories/problem.factory';
import { CreateProblemCommand } from './create-problem.command';

@CommandHandler(CreateProblemCommand)
export class CreateProblemHandler
  implements ICommandHandler<CreateProblemCommand>
{
  constructor(
    private readonly problemFactory: ProblemFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createProblemRequest,
  }: CreateProblemCommand): Promise<string> {
    const problem = this.eventPublisher.mergeObjectContext(
      await this.problemFactory.create(createProblemRequest),
    );

    problem.commit();

    return problem.getId();
  }
}
