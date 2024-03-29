import { HttpException, HttpStatus } from '@nestjs/common';
import { SubmissionLabel } from '../labels/submission.label';

export class TokensNotFoundException extends HttpException {
  constructor() {
    super(SubmissionLabel.TOKENS_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
