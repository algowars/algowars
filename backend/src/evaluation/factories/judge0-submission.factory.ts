import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJudgeSubmission } from '../dto/judge0/create-judge0-submission.dto';
import { ProblemSetup } from 'src/problem/entities/problem-setup.entity';
import { Test } from 'src/problem/entities/test.entity';

@Injectable()
export class Judge0SubmissionFactory {
  // Method to create an array of CreateJudgeSubmission objects
  create(
    problemSetup: ProblemSetup,  // Problem setup information for configuring the test environment
    tests: Test[],               // Array of Test entities representing individual test cases
    source_code: string,         // Source code submitted by the user
    language_id: number,         // ID representing the programming language used
  ): CreateJudgeSubmission[] {
    // If no tests are provided, throw an internal server error
    if (!tests.length) {
      throw new InternalServerErrorException(
        'No test provided for the submission',
      );
    }

    // Map over the array of tests and create a CreateJudgeSubmission object for each test
    return tests.map((test) => ({
      language_id,
      // Combines the user's source code with any necessary setup code from the problemSetup
      source_code: `${source_code}
${problemSetup.getTestSetup()}`,
      // Sets the expected output for this test case
      expected_output: test.getExpectedOutput(),
      // Joins the input values for this test case into a single string, separated by commas
      stdin: test
        .getInputs()
        .map((input) => input.getInput())
        .join(','),
    }));
  }
}
