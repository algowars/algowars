import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { RandomProblemDto } from './dtos/random-problem.dto';
import { Account, Problem } from 'src/data-model/entities';
import { ProblemAggregateDto } from './dtos/problem-aggregate.dto';
import { ProblemAggregate } from 'src/data-model/entities/problem/problem-aggregate';
import { ProblemNotFoundException } from './exceptions/problem-not-found.exception';
import { TestInputService } from 'src/test-input/test-input.service';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { CreateProblemDto } from './dtos/create-problem.dto';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { ProblemPermissions } from './permissions/problem.permissions';
import { ProblemValidator } from './validators/problem.validator';
import { EvaluatorService } from 'src/evaluator/evaluator.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';
import { Request } from 'express';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
    private readonly testInputService: TestInputService,
    private readonly problemSetupService: ProblemSetupService,
    private readonly evaluatorService: EvaluatorService,
    private readonly problemValidator: ProblemValidator,
  ) {}

  @UseGuards(
    AuthorizationGuard,
    PermissionsGuard([ProblemPermissions.CREATE_PROBLEM]),
    AccountOwnerGuard,
  )
  @Post()
  async createProblem(
    @Body()
    createProblemDto: CreateProblemDto,
    @Req() request: Request,
  ) {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);
    this.problemValidator.validateProblem(createProblemDto);

    return this.problemService.create(createProblemDto, account.player);
  }

  @Get('random')
  getRandomProblem(
    @Query()
    randomProblemDto: RandomProblemDto,
  ): Promise<Problem> {
    return this.problemService.findRandomProblem(
      randomProblemDto.disallowedIds,
    );
  }

  @Get('aggregate')
  async getProblemAggregate(
    @Query()
    problemAggregateDto: ProblemAggregateDto,
  ): Promise<ProblemAggregate> {
    const foundProblem = await this.problemService.findOneBySlug(
      problemAggregateDto.problemSlug,
    );
    if (!foundProblem) {
      throw new ProblemNotFoundException();
    }

    const inputs = await this.testInputService.findByProblemId(foundProblem.id);

    const problemSetup = await this.problemSetupService.findProblemSetupByIds(
      foundProblem.id,
      ProblemController.LANGUAGE_ID,
    );

    if (!problemSetup) {
      throw new ProblemNotFoundException();
    }

    return {
      problem: foundProblem,
      exampleInputs: inputs,
      initialCode: problemSetup.initialCode,
    };
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

  private static LANGUAGE_ID = 93;
}
