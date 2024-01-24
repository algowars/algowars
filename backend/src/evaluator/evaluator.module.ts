import { Module } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorController } from './evaluator.controller';

@Module({
  controllers: [EvaluatorController],
  providers: [EvaluatorService],
})
export class EvaluatorModule {}
