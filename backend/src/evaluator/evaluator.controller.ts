import { Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('evaluate/anonymous')
  async evaluateAnonymous(): Promise<null> {
    return null;
  }

  @Post('evaluate/submit')
  submit(): void {
    // return this.evaluatorService.evaluateAnonymous();
  }
}
