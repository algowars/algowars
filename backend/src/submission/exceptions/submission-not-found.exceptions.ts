import { HttpException, HttpStatus } from '@nestjs/common';
import { SubmissionLabel } from '../labels/submission.label';

export class SubmissionNotFoundException extends HttpException {
  constructor() {
    super(SubmissionLabel.SUBMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
