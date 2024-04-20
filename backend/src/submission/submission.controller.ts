import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { FindSubmissionDto } from './dtos/find-submission.dto';
import { Request } from 'express';
import { Account, Submission } from 'src/data-model/entities';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { SubmissionNotFoundException } from './exceptions/submission-not-found.exception';
import { SubmissionNotOwnedException } from './exceptions/submission-not-owned.exception';
import { EvaluatorService } from 'src/evaluator/evaluator.service';

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
  ): Promise<Submission> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    console.log(findSubmissionDto);

    const foundSubmission = await this.submissionService.findById(
      findSubmissionDto.submissionId,
      ['tokens', 'createdBy'],
    );

    console.log(foundSubmission);

    if (!foundSubmission) {
      throw new SubmissionNotFoundException();
    }

    if (foundSubmission?.createdBy?.id !== account.player.id) {
      throw new SubmissionNotOwnedException();
    }

    const foundJudgeSubmissions = this.evaluatorService.getBatchSubmissions(
      foundSubmission.getTokens(),
    );

    console.log(foundJudgeSubmissions);

    return foundSubmission;
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
