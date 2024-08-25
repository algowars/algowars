import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationTestsDto } from './dto/create-evaluation/create-evaluation-tests.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('test')
  async runTests(
    @Body() createEvaluationTests: CreateEvaluationTestsDto,
  ): Promise<string> {
    return 'testing';
  }
}
