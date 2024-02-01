import { Body, Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { CreateEvaluationDto } from 'src/data-model/entities/create-evaluation.entity';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('evaluate/anonymous')
  async evaluateAnonymous(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluatorService.getSubmission(
      (await this.evaluatorService.evaluateAnonymous(createEvaluationDto.code))
        .token,
    );
  }
}
