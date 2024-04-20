import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { ProblemService } from 'src/problem/problem.service';
import { SubmissionService } from 'src/submission/submission.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  Account,
  Problem,
  ProblemSetup,
  Submission,
} from 'src/data-model/entities';
import { ProblemNotFoundException } from 'src/problem/exceptions/problem-not-found.exception';
import { Throttle, seconds } from '@nestjs/throttler';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { ProblemSetupRequiredException } from 'src/problem-setup/exceptions/problem-setup-required.exception';
import { JudgeSubmissionException } from './exceptions/judge-submission.exception';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { CodeEvaluation } from './code-evaluation';

@Controller('v1/evaluator')
export class EvaluatorController {
  constructor(
    private readonly evaluatorService: EvaluatorService,
    private readonly problemService: ProblemService,
    private readonly problemSetupService: ProblemSetupService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Throttle({ default: { limit: seconds(4), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post('evaluate/submit')
  async createEvaluationSubmission(
    @Body() createEvaluationDto: CreateEvaluationDto,
    @Req() request: Request,
  ): Promise<Submission> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    const problem = await this.getProblem(createEvaluationDto.problemId);
    const setup = await this.getSetup(
      createEvaluationDto.problemId,
      createEvaluationDto.languageId,
    );

    const codeEvaluation = new CodeEvaluation();

    codeEvaluation.code = createEvaluationDto.code;
    codeEvaluation.testSetup = setup.testSetup;

    const judgeSubmissions = await this.createSubmission(
      codeEvaluation.build(),
      createEvaluationDto.languageId,
      problem,
    );

    console.log(judgeSubmissions);
  }

  private async createSubmission(
    code: string,
    languageId: number,
    problem: Problem,
  ) {
    const judgeSubmissions = await this.evaluatorService.batchEvaluate(
      EvaluatorService.createJudgeSubmissionTests(
        code,
        languageId,
        await problem.tests,
      ),
    );

    if (!judgeSubmissions || !judgeSubmissions?.length) {
      throw new JudgeSubmissionException();
    }

    return judgeSubmissions;
  }

  private async getProblem(problemId: number): Promise<Problem> {
    const problem = await this.problemService.findOneById(problemId, {
      relations: ['tests', 'tests.inputs'],
    });

    if (!problem) {
      throw new ProblemNotFoundException();
    }

    return problem;
  }

  private async getSetup(
    problemId: number,
    languageId: number,
  ): Promise<ProblemSetup> {
    const setup = await this.problemSetupService.findProblemSetupByIds(
      problemId,
      languageId,
    );

    if (!setup) {
      throw new ProblemSetupRequiredException();
    }

    return setup;
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
