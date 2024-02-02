import { Body, Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { CreateEvaluationDto } from 'src/data-model/entities/create-evaluation.entity';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('evaluate/anonymous')
  evaluateAnonymous(
    @Body() createEvaluationDto: CreateEvaluationDto,
  ): Promise<EvaluatorSubmissionResponse> {
    return this.evaluatorService.evaluateAnonymous(createEvaluationDto.code);
  }
}
