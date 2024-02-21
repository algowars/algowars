import { Body, Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { CreateEvaluationDto } from 'src/evaluator/dto/create-evaluation.entity';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('evaluate/anonymous')
  async evaluateAnonymous(
    @Body() createEvaluationDto: CreateEvaluationDto,
  ): Promise<null> {
    return null;
  }

  @Post('evaluate/submit')
  submit(
    createEvaluation: CreateEvaluationDto,
  ): Promise<EvaluatorSubmissionResponse> {
    return this.evaluatorService.evaluateAnonymous(`
        ${createEvaluation.code}
        `);
  }
}
