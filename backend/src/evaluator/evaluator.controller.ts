import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { ProblemService } from 'src/problem/problem.service';
import { SubmissionService } from 'src/submission/submission.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  Player,
  ProblemSetup,
  Submission,
  Test,
} from 'src/data-model/entities';
import { ProblemNotFoundException } from 'src/problem/exceptions/problem-not-found.exception';
import { Throttle, seconds } from '@nestjs/throttler';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { CreateJudgeSubmission } from 'src/data-model/models/create-judge-submission';
import { JudgeSubmissionResponse } from 'src/data-model/models/judge-submission-response';
import { CreateSubmissionDto } from 'src/submission/dtos/create-submission.dto';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { ProblemSetupRequiredException } from 'src/problem-setup/exceptions/problem-setup-required.exception';
import { JudgeSubmissionException } from './exceptions/judge-submission.exception';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';

@Controller('v1/evaluator')
export class EvaluatorController {
  constructor(
    private readonly evaluatorService: EvaluatorService,
    private readonly problemService: ProblemService,
    private readonly problemSetupService: ProblemSetupService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Throttle({ default: { limit: seconds(5), ttl: 1 } })
  @Post('evaluate/guest/test')
  async evaluateGuestTest(): Promise<void> {}

  @Throttle({ default: { limit: seconds(7), ttl: 1 } })
  @Post('evaluate/guest/submit')
  async evaluateGuestSubmit(): Promise<void> {}

  @Throttle({ default: { limit: seconds(3), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post('evaluate/test')
  async evaluateTest(
    @Body() createEvaluationDto: CreateEvaluationDto,
    @Req() request: Request,
  ): Promise<JudgeSubmissionResponse[]> {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account) {
      throw new AccountNotFoundException();
    }

    if (!account.player) {
      throw new PlayerNotFoundException();
    }

    const foundProblem = await this.problemService.findOneById(
      createEvaluationDto.problemId,
      {
        relations: ['tests'],
      },
    );

    if (!foundProblem) {
      throw new ProblemNotFoundException();
    }

    const setup = await this.problemSetupService.findProblemSetupByIds(
      foundProblem.id,
      createEvaluationDto.languageId,
    );

    if (!setup) {
      throw new ProblemSetupRequiredException();
    }

    const judgeSubmissions = await this.evaluatorService.batchEvaluate(
      this.mapCreateSubmissions(
        createEvaluationDto,
        setup,
        (await foundProblem.tests).slice(0, 3),
      ),
    );

    if (!judgeSubmissions || !judgeSubmissions?.length) {
      throw new JudgeSubmissionException();
    }

    return judgeSubmissions;
  }

  @Throttle({ default: { limit: seconds(4), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post('evaluate/submit')
  async evaluateSubmit(
    @Body() createEvaluationDto: CreateEvaluationDto,
    @Req() request: Request,
  ): Promise<Submission> {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account) {
      throw new AccountNotFoundException();
    }

    if (!account.player) {
      throw new PlayerNotFoundException();
    }

    const foundProblem = await this.problemService.findOneById(
      createEvaluationDto.problemId,
      {
        relations: ['tests', 'tests.inputs'],
      },
    );

    if (!foundProblem) {
      throw new ProblemNotFoundException();
    }

    const setup = await this.problemSetupService.findProblemSetupByIds(
      foundProblem.id,
      createEvaluationDto.languageId,
    );

    if (!setup) {
      throw new ProblemSetupRequiredException();
    }

    const judgeSubmissions = await this.evaluatorService.batchEvaluate(
      this.mapCreateSubmissions(
        createEvaluationDto,
        setup,
        await foundProblem.tests,
      ),
    );

    if (!judgeSubmissions || !judgeSubmissions?.length) {
      throw new JudgeSubmissionException();
    }

    return this.submissionService.createSubmission(
      this.mapCreateSubmission(
        createEvaluationDto.code,
        judgeSubmissions.slice(0, 1),
        account.palyer,
      ),
    );
  }

  private mapCreateSubmission(
    code: string,
    tokens: JudgeSubmissionResponse[],
    createdBy?: Player,
  ): CreateSubmissionDto {
    return {
      code,
      tokens,
      createdBy,
    };
  }

  private mapCreateSubmissions(
    createEvaluationDto: CreateEvaluationDto,
    problemSetup: ProblemSetup,
    tests: Test[],
  ): CreateJudgeSubmission[] {
    console.log('TESTS: ', tests);
    return tests.map((test) => ({
      language_id: createEvaluationDto.languageId,
      source_code: `${createEvaluationDto.code}
      ${problemSetup.testSetup}`,
      expected_output: test.expectedOutput,
      stdin: test.inputs.map((input) => input.input).join(','),
    }));
  }
}
