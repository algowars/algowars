import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { FindSubmissionDto } from './dtos/find-submission.dto';
import { EvaluatorService } from 'src/evaluator/evaluator.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { SubmissionPaginationDto } from './dtos/submission-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Submission } from 'src/data-model/entities';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerService } from 'src/player/player.service';

@Controller('v1/submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly evaluatorService: EvaluatorService,
    private readonly playerService: PlayerService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get('find/account')
  async getAccountSubmissionsPageable(
    @Query() submissionPaginationDto: SubmissionPaginationDto,
    @Req() request: Request,
  ): Promise<PaginationResponse<Submission>> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundAccount = await this.accountService.findByUsername(
      submissionPaginationDto.username,
    );

    if (!foundAccount) {
      throw new AccountNotFoundException();
    }

    if (foundAccount.sub !== userSub) {
      throw new HttpException(
        'You do not own this account.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.submissionService.findAccountSubmissionsPageable(
      submissionPaginationDto,
    );
  }

  @Get()
  getSubmission(@Query() submissionDto: FindSubmissionDto) {
    return this.evaluatorService.getSubmission(submissionDto.submissionId);
  }
}
