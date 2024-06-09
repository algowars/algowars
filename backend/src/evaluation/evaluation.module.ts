import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';

@Module({
  controllers: [EvaluationController],
  providers: [],
})
export class EvaluationModule {}
