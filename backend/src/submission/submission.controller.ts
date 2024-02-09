import { Controller, Get, Query } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { FindSubmissionDto } from './dtos/find-submission.dto';

@Controller('v1/submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  getSubmission(@Query() submissionDto: FindSubmissionDto) {
    return this.submissionService.getSubmission(submissionDto.submissionId);
  }
}
