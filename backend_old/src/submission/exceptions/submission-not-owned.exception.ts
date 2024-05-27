import { HttpException, HttpStatus } from '@nestjs/common';
import { SubmissionLabel } from '../labels/submission.label';

export class SubmissionNotOwnedException extends HttpException {
  constructor() {
    super(SubmissionLabel.SUBMISSION_NOT_OWNED, HttpStatus.CONFLICT);
  }
}
