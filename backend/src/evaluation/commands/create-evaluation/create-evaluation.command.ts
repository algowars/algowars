import { CreateEvaluation } from 'src/evaluation/dto/request/create-evaluation.dto';

export class CreateEvaluationCommand {
  constructor(
    public readonly createEvaluation: CreateEvaluation,
    public readonly sub: string,
  ) {}
}
