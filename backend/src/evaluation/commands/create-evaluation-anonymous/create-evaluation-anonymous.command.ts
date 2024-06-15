import { CreateEvaluationAnonymous } from 'src/evaluation/dto/request/create-evaluation-anonymous.dto';

export class CreateEvaluationAnonymousCommand {
  constructor(
    public readonly createEvaluationAnonymous: CreateEvaluationAnonymous,
  ) {}
}
