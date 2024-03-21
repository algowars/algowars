import { Controller, Get, Query } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { FindSubmissionDto } from './dtos/find-submission.dto';
import { EvaluatorService } from 'src/evaluator/evaluator.service';

@Controller('v1/submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly evaluatorService: EvaluatorService,
  ) {}

  @Get()
  getSubmission(@Query() submissionDto: FindSubmissionDto) {
    return this.evaluatorService.getSubmission(submissionDto.submissionId);
  }
}
