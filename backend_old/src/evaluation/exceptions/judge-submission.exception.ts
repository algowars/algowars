import { HttpException, HttpStatus } from '@nestjs/common';
import { EvaluatorLabel } from '../labels/evaluation.label';

export class JudgeSubmissionException extends HttpException {
  constructor() {
    super(EvaluatorLabel.JUDGE_SUBMISSION_ERROR, HttpStatus.BAD_REQUEST);
  }
}
