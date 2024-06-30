import {
  Controller,
  Get,
  Param,
  Query,
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
import { Judge0Submission } from 'src/evaluation/dto/judge0/judge0-submission.dto';
import { FindSubmissionResult } from './dto/request/find-submission-result.dto';
import { SubmissionResultFilter } from './dto/request/sumission-result-filter.dto';

@Controller('v1/submission-result')
export class SubmissionResultController {
  public static IN_QUEUE_ID = 1;
  public static PROCESSING_ID = 2;
  public static ACCEPTED_ID = 3;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get('solutions')
  getSolutions(
    @Param() findSubmissionResult: FindSubmissionResult,
    @Query() submissionResultFilter: SubmissionResultFilter,
  ): void {
    console.log(findSubmissionResult, submissionResultFilter);
  }

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

    return submissionResultDto;

    // if (this.isFinished(submissionResultDto)) {
    //   if (submissionResultDto.isSubmission) {
    //     return {
    //       ...submissionResultDto,
    //       testcases: [
    //         submissionResultDto.testcases.find((testcase) => {
    //           if (![1, 2, 3].includes(testcase.statusId)) {
    //             return testcase;
    //           }
    //         }),
    //       ],
    //     };
    //   }
    //   return submissionResultDto;
    // }

    // const tokens = submissionResultDto.testcases.map(
    //   (testcase) => testcase.token,
    // );

    // const judge0Submissions = await this.queryBus.execute<
    //   FindBatchEvaluationQuery,
    //   Judge0Submission[]
    // >(new FindBatchEvaluationQuery(tokens));

    // const testcases = await this.commandBus.execute<
    //   UpdateSubmissionResultTestcasesCommand,
    //   SubmissionResultTestcaseDto[]
    // >(
    //   new UpdateSubmissionResultTestcasesCommand(
    //     this.getUpdatedSubmission(judge0Submissions),
    //   ),
    // );

    // if (submissionResultDto.isSubmission) {
    //   return {
    //     ...submissionResultDto,
    //     testcases: [
    //       testcases.find((testcase) => {
    //         if (![1, 2, 3].includes(testcase.statusId)) {
    //           return testcase;
    //         }
    //       }),
    //     ],
    //   };
    // }

    // return {
    //   ...submissionResultDto,
    //   testcases,
    // };
  }

  private isFinished(submissionResultDto: SubmissionResultDto): boolean {
    let isFinished = true;
    submissionResultDto.testcases.forEach(({ statusId }) => {
      if (!statusId) {
        isFinished = false;
      }

      if (statusId === SubmissionResultController.IN_QUEUE_ID) {
        isFinished = false;
      }

      if (statusId === SubmissionResultController.PROCESSING_ID) {
        isFinished = false;
      }
    });

    return isFinished;
  }

  private getUpdatedSubmission(
    judge0Submissions: Judge0Submission[],
  ): UpdateSubmissionResultTestcase[] {
    return judge0Submissions.map((submission, index) => ({
      order: index,
      token: submission.token,
      sourceCode: submission.source_code,
      stdin: submission.stdin,
      stdout: submission.stdout,
      expectedOutput: submission.expected_output,
      statusId: submission.status_id,
      stderr: submission.stderr,
    }));
  }
}
