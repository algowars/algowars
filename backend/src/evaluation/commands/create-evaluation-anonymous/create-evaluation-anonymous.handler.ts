import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEvaluationAnonymousCommand } from './create-evaluation-anonymous.command';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { ProblemEntityRepository } from 'src/problem/db/problem-entity.repository';

@CommandHandler(CreateEvaluationAnonymousCommand)
export class CreateEvaluationAnonymousHandler
  implements ICommandHandler<CreateEvaluationAnonymousCommand>
{
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly problemEntityRepository: ProblemEntityRepository,
  ) {}

  async execute({
    createEvaluationAnonymous,
  }: CreateEvaluationAnonymousCommand): Promise<string[]> {
    const problemSetup = await this.problemEntityRepository.findBySlug(
      createEvaluationAnonymous.problemSlug,
    );
    return this.evaluationService.createSubmission();
  }
}
