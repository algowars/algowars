import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import {
  Account,
  Problem,
  ProblemSetup,
  Submission,
  Test,
} from 'src/data-model/entities';
import { ProblemService } from 'src/problem/problem.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { ProblemNotFoundException } from 'src/problem/exceptions/problem-not-found.exception';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { SubmissionService } from 'src/submission/submission.service';
import { CreateEvaluatorSubmission } from 'src/data-model/model/create-evaluator-submission';
import { CreateSubmissionDto } from 'src/submission/dtos/create-submission.dto';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(
    private readonly evaluatorService: EvaluatorService,
    private readonly problemService: ProblemService,
    private readonly accountService: AccountService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Post('evaluate/submit')
  async submit(
    @Body() createEvaluationDto: CreateEvaluationDto,
  ): Promise<Submission> {
    console.log(createEvaluationDto);
    const foundProblem = await this.problemService.findOneById(
      createEvaluationDto.problemId,
      ['tests', 'tests.inputs', 'problemSetups'],
    );

    if (!foundProblem) {
      throw new ProblemNotFoundException();
    }

    let account = null;
    if (createEvaluationDto.accountId) {
      const foundAccount = await this.accountService.findById(
        createEvaluationDto.accountId,
      );

      if (!foundAccount || foundAccount.sub !== createEvaluationDto.sub) {
        throw new AccountNotFoundException();
      }

      account = foundAccount;
    }

    console.log('HERE', foundProblem);

    if (!foundProblem.problemSetups) {
      throw new HttpException(
        'Problem setup is required',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const judgeSubmissions = await this.evaluatorService.batchEvaluate(
      this.mapCreateSubmissions(
        createEvaluationDto,
        foundProblem.problemSetups.find((setup) => setup.languageId === 93),
        await foundProblem.tests,
      ),
    );

    console.log(judgeSubmissions.map((sub) => sub.token).join(','));

    if (!judgeSubmissions || !judgeSubmissions?.length) {
      throw new HttpException(
        'Error creating submission',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return this.submissionService.createSubmission(
      this.mapCreateSubmission(
        createEvaluationDto.code,
        judgeSubmissions,
        account,
      ),
    );
  }

  private mapCreateSubmission(
    code: string,
    tokens: EvaluatorSubmissionResponse[],
    createdBy?: Account,
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
  ): CreateEvaluatorSubmission[] {
    return tests.map((test) => ({
      language_id: EvaluatorController.LANGUAGE_ID,
      source_code: `${createEvaluationDto.code}
      ${problemSetup.testSetup}`,
      expected_output: test.expectedOutput,
      stdin: test.inputs.map((input) => input.input).join(','),
    }));
  }

  public static LANGUAGE_ID = 93;
}
