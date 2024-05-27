import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemSetupLabel } from '../labels/problem-setup.label';

export class ProblemSetupRequiredException extends HttpException {
  constructor() {
    super(ProblemSetupLabel.PROBLEM_SETUP_REQUIRED, HttpStatus.CONFLICT);
  }
}
