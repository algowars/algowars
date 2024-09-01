import { Module } from '@nestjs/common';
import { ProblemController } from './infrastructure/problem.controller';

@Module({
  controllers: [ProblemController],
})
export class ProblemModule {}
