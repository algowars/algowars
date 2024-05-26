import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { Throttle, seconds } from '@nestjs/throttler';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import {
  Account,
  Problem,
  ProblemSetup,
  Submission,
} from 'src/data-model/entities';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { ProblemService } from 'src/problem/problem.service';
import { ProblemNotFoundException } from 'src/problem/exceptions/problem-not-found.exception';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { ProblemSetupNotFoundException } from 'src/problem/exceptions/problem-setup-not-found.exception';
import { CreateSubmissionDto } from './dtos/create-submission.dto';
import { CreateSubmissionParams } from './dtos/create-submission-params';
import { JudgeSubmissionException } from 'src/evaluation/exceptions/judge-submission.exception';
import { SubmissionService } from 'src/submission/submission.service';

@Controller('v1/evaluation')
export class EvaluationController {
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly submissionService: SubmissionService,
    private readonly problemService: ProblemService,
    private readonly problemSetupService: ProblemSetupService,
  ) {}

  @Throttle({ default: { limit: seconds(4), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  async createSubmission(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Req() request: Request,
  ): Promise<Submission> {
    this.validatePrivateAccount(request);
    const { player } = this.mapPrivateAccount(request);

    const problem = await this.findProblem(createSubmissionDto.problemId);
    const problemSetup = await this.findProblemSetup(
      createSubmissionDto.problemId,
      createSubmissionDto.languageId,
    );

    const createSubmissionParams = new CreateSubmissionParams();

    createSubmissionParams.problem = problem;
    createSubmissionParams.problemSetup = problemSetup;
    createSubmissionParams.languageId = createSubmissionDto.languageId;
    createSubmissionParams.sourceCode = createSubmissionDto.sourceCode;
    createSubmissionParams.tests = (await problem.tests) ?? [];

    const tokens = await this.evaluationService.createSubmission(
      createSubmissionParams,
    );

    if (!tokens) {
      throw new JudgeSubmissionException();
    }

    return this.submissionService.createSubmission(
      createSubmissionDto.sourceCode,
      tokens,
      problem,
      createSubmissionDto.languageId,
      player,
    );
  }

  private async findProblemSetup(
    problemId: number,
    languageId: number,
  ): Promise<ProblemSetup> {
    const problemSetup = await this.problemSetupService.findProblemSetupByIds(
      problemId,
      languageId,
    );

    if (!problemSetup) {
      throw new ProblemSetupNotFoundException();
    }

    return problemSetup;
  }

  private async findProblem(problemId: number): Promise<Problem> {
    const problem = await this.problemService.findProblemWithTests(problemId);

    if (!problem) {
      throw new ProblemNotFoundException();
    }

    return problem;
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

  static JAVASCRIPT_LANGUAGE_ID = 93;
}
