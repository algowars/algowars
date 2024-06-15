import { Injectable } from '@nestjs/common';
import { ProblemSetup } from '../entities/problem-setup.entity';
import { ProblemSetupSchema } from './problem-setup.schema';

@Injectable()
export class ProblemSetupSchemaFactory {
  create(problemSetup: ProblemSetup): ProblemSetupSchema {}
}
