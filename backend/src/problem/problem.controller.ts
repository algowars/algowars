import { Controller, Get, Query } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { RandomProblemDto } from './dto/random-problem.dto';
import { Problem } from 'src/data-model/entities';
import { GetProblemAggregate } from './dto/get-problem-aggregate';
import { ProblemNotFoundException } from './exceptions/problem-not-found.exception';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { ProblemSetupNotFoundException } from 'src/problem-setup/exceptions/problem-setup-not-found.exception';
import { ProblemAggregate } from 'src/data-model/model/problem-aggregate';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
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

  @Get('/aggregate')
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

    const foundProblemSetup = await this.problemSetupService.findOne(
      foundProblem.id,
      getProblemAggregate.languageId,
      ['initialInputs'],
    );
    if (!foundProblemSetup) {
      throw new ProblemSetupNotFoundException();
    }

    return {
      problem: foundProblem,
      problemSetup: foundProblemSetup,
    };
  }
}
