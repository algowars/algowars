import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { Submission } from '../entities/submission.entity';
import { Judge0Submission } from '../dto/judge0/judge0-submission.dto';

@Injectable()
export class SubmissionFactory implements EntityFactory<Submission> {
  create() {
    return new Submission('', '', 0, '', new Date(), new Date(), '', 0);
  }

  createFromJudgeSubmission(submission: Judge0Submission): Submission {
    return new Submission(
      submission.token,
      submission.source_code,
      submission.language_id,
      submission.stdin,
      new Date(submission.created_at),
      new Date(submission.finished_at),
      submission.time,
      submission.memory,
    );
  }
}
