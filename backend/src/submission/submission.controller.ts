import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { FindSubmissionDto } from './dtos/find-submission.dto';
import { Request } from 'express';
import { Account } from 'src/data-model/entities';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { SubmissionNotFoundException } from './exceptions/submission-not-found.exception';
import { SubmissionNotOwnedException } from './exceptions/submission-not-owned.exception';
import { EvaluatorService } from 'src/evaluator/evaluator.service';
import { JudgeSubmission } from 'src/data-model/models/judge-submission';
import { SubmissionAggregateDto } from './dtos/submission-aggregate.dto';

@Controller('v1/submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly evaluatorService: EvaluatorService,
  ) {}

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Get('find')
  async findSubmissionById(
    @Query() findSubmissionDto: FindSubmissionDto,
    @Req() request: Request,
  ): Promise<SubmissionAggregateDto> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    const foundSubmission = await this.submissionService.findById(
      findSubmissionDto.submissionId,
      ['tokens', 'createdBy'],
    );

    if (!foundSubmission) {
      throw new SubmissionNotFoundException();
    }

    if (foundSubmission?.createdBy?.id !== account.player.id) {
      throw new SubmissionNotOwnedException();
    }

    const judgeSubmissions = await this.getJudgeSubmissions(
      foundSubmission.getTokens(),
    );

    let outSubmissions = [];

    if (
      judgeSubmissions.find((sub) => sub.status.description === 'Wrong Answer')
    ) {
      outSubmissions = judgeSubmissions
        .filter((sub) => sub.status.description === 'Wrong Answer')
        .slice(0, 1);
    } else {
      outSubmissions = judgeSubmissions.slice(0, 2);
    }

    return {
      submission: foundSubmission,
      judgeSubmissions: outSubmissions,
    };
  }

  private async getJudgeSubmissions(
    tokens: string[],
  ): Promise<JudgeSubmission[]> {
    const foundJudgeSubmissions =
      await this.evaluatorService.getBatchSubmissions(tokens);

    return foundJudgeSubmissions;
  }

  private mapPrivateAccount(request: Request): Account {
    return request.account;
  }

  private validatePrivateAccount(request: Request): void {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account.player) {
      throw new PlayerNotFoundException();
    }
  }
}
