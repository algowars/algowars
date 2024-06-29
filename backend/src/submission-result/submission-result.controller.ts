import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { FindSubmissionResultDto } from './dto/find-submission-result.dto';
import { SubmissionResultDto } from './dto/submission-result.dto';
import { Request } from 'express';
import { FindSubmissionResultByIdQuery } from './queries/find-submission-result-by-id/find-submission-result-by-id.query';
import { AccountDto } from 'src/account/dto/account.dto';
import { FindAccountBySubQuery } from 'src/account/queries/find-account-by-sub/find-account-by-sub.query';
import { UpdateSubmissionResultTestcase } from './dto/update-submission-result-testcase.dto';
import { UpdateSubmissionResultTestcasesCommand } from './commands/update-submission-result-testcases/update-submission-result-testcases.command';
import { FindBatchEvaluationQuery } from 'src/evaluation/queries/find-batch-evaluation/find-batch-evaluation.query';
import { Judge0Submission } from 'src/evaluation/dto/judge0/judge0-submission.dto';
import { SubmissionResultTestcaseDto } from './dto/submission-result-testcase.dto';

@Controller('v1/submission-result')
export class SubmissionResultController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get('/poll/:id')
  async pollSubmissionresult(
    @Param() findSubmissionResultDto: FindSubmissionResultDto,
    @Req() request: Request,
  ): Promise<SubmissionResultDto> {
    const sub = request.auth.payload.sub;

    const accountDto = await this.queryBus.execute<
      FindAccountBySubQuery,
      AccountDto
    >(new FindAccountBySubQuery(sub));

    const submissionResultDto = await this.queryBus.execute<
      FindSubmissionResultByIdQuery,
      SubmissionResultDto
    >(new FindSubmissionResultByIdQuery(findSubmissionResultDto.id));

    if (submissionResultDto.createdBy.id !== accountDto.id) {
      throw new UnauthorizedException('You do not own this submission');
    }

    if (submissionResultDto.testcases.find((testcase) => testcase.statusId)) {
      return submissionResultDto;
    }

    const tokens = submissionResultDto.testcases.map(
      (testcase) => testcase.token,
    );

    const judge0Submissions = await this.queryBus.execute<
      FindBatchEvaluationQuery,
      Judge0Submission[]
    >(new FindBatchEvaluationQuery(tokens));

    const testcases = await this.commandBus.execute<
      UpdateSubmissionResultTestcasesCommand,
      SubmissionResultTestcaseDto[]
    >(
      new UpdateSubmissionResultTestcasesCommand(
        this.getUpdatedSubmission(judge0Submissions),
      ),
    );

    return {
      ...submissionResultDto,
      testcases,
    };
  }

  private getUpdatedSubmission(
    judge0Submissions: Judge0Submission[],
  ): UpdateSubmissionResultTestcase[] {
    return judge0Submissions.map((submission, index) => ({
      order: index,
      token: submission.token,
      sourceCode: submission.source_code,
      stdout: submission.stdout,
      expectedOutput: submission.expected_output,
      statusId: submission.status_id,
      stderr: submission.stderr,
    }));
  }
}
