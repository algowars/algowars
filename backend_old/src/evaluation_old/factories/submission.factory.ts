import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { Submission } from '../entities/submission.entity';
import { Judge0Submission } from '../dto/judge0/judge0-submission.dto';

@Injectable()
export class SubmissionFactory implements EntityFactory<Submission> {

  // Method to create a new empty Submission instance with default values
  create(): Submission {
    return new Submission('', '', 0, '', new Date(), new Date(), '', 0);
  }

  // Method to create a Submission instance from a Judge0Submission DTO
  createFromJudgeSubmission(submission: Judge0Submission): Submission {
    return new Submission(
      submission.token,                // The unique token identifying the submission
      submission.source_code,          // The source code that was submitted
      submission.language_id,          // The ID of the programming language used
      submission.stdin,                // The standard input provided during execution
      new Date(submission.created_at), // The timestamp when the submission was created
      new Date(submission.finished_at),// The timestamp when the submission finished executing
      submission.time,                 // The time taken for the submission to execute
      submission.memory,               // The memory used during execution
    );
  }
}
