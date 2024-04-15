import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemLabel } from '../labels/problem.label';

export class ProblemTestsInvalidLengthException extends HttpException {
  constructor() {
    super(ProblemLabel.PROBLEM_TESTS_LENGTHS_INVALID, HttpStatus.BAD_REQUEST);
  }
}
