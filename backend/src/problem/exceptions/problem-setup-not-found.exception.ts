import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemLabel } from '../labels/problem.label';

export class ProblemSetupNotFoundException extends HttpException {
  constructor() {
    super(ProblemLabel.PROBLEM_SETUP_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
