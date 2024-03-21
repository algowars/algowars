import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { RandomProblemDto } from './dto/random-problem.dto';
import { Problem } from 'src/data-model/entities';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateProblemDto } from './dto/create-problem.dto';
import { AccountService } from 'src/account/account.service';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { GetProblemAggregate } from './dto/get-problem-aggregate';
import { ProblemNotFoundException } from './exceptions/problem-not-found.exception';
import { ProblemAggregate } from './problem-aggregate';
import { TestInputService } from 'src/test-input/test-input.service';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
    private readonly accoutService: AccountService,
    private readonly testInputService: TestInputService,
    private readonly problemSetupService: ProblemSetupService,
  ) {}

  @Get('random')
  getRandomProblem(
    @Query()
    randomProblemDto: RandomProblemDto,
  ): Promise<Problem> {
    return this.problemService.findRandomProblem(
      randomProblemDto.disallowedIds,
    );
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createProblem(
    @Body() createProblemDto: CreateProblemDto,
    @Req() request: Request,
  ): Promise<void> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundAccount = await this.accoutService.findBySub(userSub);

    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
  }

  @Get('aggregate')
  async getProblemAggregate(
    @Query()
    getProblemAggregate: GetProblemAggregate,
  ): Promise<ProblemAggregate> {
    const foundProblem = await this.problemService.findOneBySlug(
      getProblemAggregate.problemSlug,
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

  private static LANGUAGE_ID = 93;
}
