import { Injectable } from '@nestjs/common';
import { ProblemSetup } from '../../entities/problem-setup.entity';
import { ProblemSetupSchema } from './problem-setup.schema';

@Injectable()
export class ProblemSetupSchemaFactory {
  create(problemSetup: ProblemSetup): ProblemSetupSchema {
    return {
      problemId: problemSetup.getProblemId(),
      languageId: problemSetup.getLanguageId(),
      initialCode: problemSetup.getInitialCode(),
      testSetup: problemSetup.getTestSetup(),
      problem: null,
    };
  }

  createFromSchema(problemSetupSchema: ProblemSetupSchema): ProblemSetup {
    return new ProblemSetup(
      problemSetupSchema.problemId,
      problemSetupSchema.languageId,
      problemSetupSchema.initialCode,
      problemSetupSchema.testSetup,
    );
  }
}
