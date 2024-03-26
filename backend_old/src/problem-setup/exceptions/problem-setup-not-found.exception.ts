import { HttpException, HttpStatus } from '@nestjs/common';
import { ProblemSetupLabel } from '../labels/problem-setup.label';

export class ProblemSetupNotFoundException extends HttpException {
  constructor() {
    super(ProblemSetupLabel.PROBLEM_SETUP_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
