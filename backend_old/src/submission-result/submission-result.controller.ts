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
import { FindSubmissionResult } from './dto/request/find-submission-result.dto';
import { SubmissionResultFilter } from './dto/request/sumission-result-filter.dto';

@Controller('v1/submission-result')
export class SubmissionResultController {
  public static IN_QUEUE_ID = 1;
  public static PROCESSING_ID = 2;
  public static ACCEPTED_ID = 3;
  public static WRONG_ANSWER_ID = 4;

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

    if (submissionResultDto.isSubmission) {
      const testcases = [
        submissionResultDto.testcases.find(
          (testcase) =>
            testcase.statusId === SubmissionResultController.WRONG_ANSWER_ID,
        ),
      ];

      return {
        ...submissionResultDto,
        isAccepted: testcases.length > 0,
        testcases,
      };
    }

    return submissionResultDto;
  }
}
