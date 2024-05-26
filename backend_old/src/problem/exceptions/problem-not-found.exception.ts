import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemLabel } from '../labels/problem.label';

export class ProblemNotFoundException extends HttpException {
  constructor() {
    super(ProblemLabel.PROBLEM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
