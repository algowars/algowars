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
import { Problem, Submission } from 'src/data-model/entities';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateProblemDto } from './dto/create-problem.dto';
import { AccountService } from 'src/account/account.service';
import { Request } from 'express';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
    private readonly accoutService: AccountService,
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

    const foundAccount = await this.accoutService.findAccountBySub(userSub);

    if (!foundAccount) {
      throw new AccountNotFoundException();
    }

    // const testedSolution = new Submission();

    // const createdProblem = await this.problemService.create(
    //   createProblemDto.title,
    //   createProblemDto.question,
    //   createProblemDto.slug,
    //   foundAccount,
    // );
  }
  // @Get('/aggregate')
  // async getProblemAggregate(
  //   @Query()
  //   getProblemAggregate: GetProblemAggregate,
  // ): Promise<ProblemAggregate> {
  //   const foundProblem = await this.problemService.findOneBySlug(
  //     getProblemAggregate.problemSlug,
  //   );
  //   if (!foundProblem) {
  //     throw new ProblemNotFoundException();
  //   }

  //   const foundProblemSetup = await this.problemSetupService.findOne(
  //     foundProblem.id,
  //     getProblemAggregate.languageId,
  //     ['initialInputs'],
  //   );
  //   if (!foundProblemSetup) {
  //     throw new ProblemSetupNotFoundException();
  //   }

  //   return {
  //     problem: foundProblem,
  //     problemSetup: foundProblemSetup,
  //   };
  // }
}
