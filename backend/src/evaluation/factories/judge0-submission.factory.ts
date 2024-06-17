import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJudgeSubmission } from '../dto/judge0/create-judge0-submission.dto';
import { ProblemSetup } from 'src/problem/entities/problem-setup.entity';
import { Test } from 'src/problem/entities/test.entity';

@Injectable()
export class Judge0SubmissionFactory {
  create(
    problemSetup: ProblemSetup,
    tests: Test[],
    source_code: string,
    language_id: number,
  ): CreateJudgeSubmission[] {
    if (!tests.length) {
      throw new InternalServerErrorException(
        'No test provided for the submission',
      );
    }

    console.log(
      'CODE: ',
      `
        ${source_code}
        ${problemSetup.getTestSetup()}
        `,
    );

    return tests.map((test) => ({
      language_id,
      source_code: `${source_code}
${problemSetup.getTestSetup()}`,
      expected_output: test.getExpectedOutput(),
      stdin: test
        .getInputs()
        .map((input) => input.getInput())
        .join(','),
    }));
  }
}
