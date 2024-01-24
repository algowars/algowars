import { Body, Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { CreateEvaluationDto } from 'src/data-model/entities/create-evaluation.entity';

@Controller('evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

    @Post('evaluate/anonymous')
     evaluateAnonymous(@Body() createEvaluationDto: CreateEvaluationDto) {
      return "HELLO";
    }
  }
}
