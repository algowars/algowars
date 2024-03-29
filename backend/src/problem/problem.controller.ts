import { Controller, Get, Query } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { RandomProblemDto } from './dtos/random-problem.dto';
import { Problem } from 'src/data-model/entities';
import { ProblemAggregateDto } from './dtos/problem-aggregate.dto';
import { ProblemAggregate } from 'src/data-model/entities/problem/problem-aggregate';
import { ProblemNotFoundException } from './exceptions/problem-not-found.exception';
import { TestInputService } from 'src/test-input/test-input.service';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';

@Controller('v1/problem')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
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

  private static LANGUAGE_ID = 93;
}
