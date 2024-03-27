import { Controller } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';

@Controller('evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}
}
