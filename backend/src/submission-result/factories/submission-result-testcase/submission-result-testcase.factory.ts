import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/db/entity.factory';
import { v4 as uuidv4 } from 'uuid';
import { CreateSubmissionResultTestcase } from 'src/submission-result/dto/create-submission-result-testcase.dto';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';

@Injectable()
export class SubmissionResultTestcaseFactory
  implements EntityFactory<SubmissionResultTestcase>
{
  constructor() {}

  async create(
    createSubmissionResultTestcase: CreateSubmissionResultTestcase,
  ): Promise<SubmissionResultTestcase> {
    return Promise.resolve(
      new SubmissionResultTestcase(
        uuidv4(),
        createSubmissionResultTestcase.token,
        createSubmissionResultTestcase.order,
        createSubmissionResultTestcase.isRandomTestcase,
        createSubmissionResultTestcase.sourceCode,
        createSubmissionResultTestcase.stdin,
        createSubmissionResultTestcase.stdout,
        createSubmissionResultTestcase.expectedOutput,
        createSubmissionResultTestcase.statusId,
        createSubmissionResultTestcase.stderr,
      ),
    );
  }
}
