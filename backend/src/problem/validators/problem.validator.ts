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
    if (tests.length < 6) {
      throw new ProblemTestsInvalidLengthException();
    }

    tests.forEach((test, i) => {
      if (!test.inputs) {
        throw new HttpException(
          `Test input is required for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const inputsArray = test.inputs.split(',');
      if (inputsArray.some((input) => input.trim() === '')) {
        throw new HttpException(
          `Each input must be non-empty for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!test.expectedOutput) {
        throw new HttpException(
          `Test expectedOutput is required for the test at index ${i}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
