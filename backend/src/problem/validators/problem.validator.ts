import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProblemTestsInvalidLengthException } from '../exceptions/problem-tests-invalid-length.exception';
import { CreateProblemDto } from '../dtos/create-problem.dto';
import { CreateProblemTestDto } from '../dtos/create-problem-test.dto';

@Injectable()
export class ProblemValidator {
  validateProblem(createProblemDto: CreateProblemDto): void {
    this.validateTest(createProblemDto.tests ?? []);
  }

  private validateTest(tests: CreateProblemTestDto[]): void {
    console.log('Received tests for validation:', tests);
    if (tests.length < 6) {
      console.log('Error: Not enough tests provided.');
      throw new ProblemTestsInvalidLengthException();
    }

    tests.forEach((test, i) => {
      if (!test.inputs) {
        console.log(`Error: Test input is missing at index ${i}`);
        throw new HttpException(
          `Test input is required for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const inputsArray = test.inputs.split(',');
      if (inputsArray.some((input) => input.trim() === '')) {
        console.log(`Error: Empty input found at index ${i}`);
        throw new HttpException(
          `Each input must be non-empty for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!test.expectedOutput) {
        console.log(`Error: Test expected output is missing at index ${i}`);
        throw new HttpException(
          `Test expectedOutput is required for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    console.log('All tests passed validation.');
  }
}
