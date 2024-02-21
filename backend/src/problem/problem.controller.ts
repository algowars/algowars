import { Controller, Get, Query } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { RandomProblemDto } from './dto/random-problem.dto';
import { Problem } from 'src/data-model/entities';

@Controller('v1/problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get('random')
  getRandomProblem(
    @Query()
    randomProblemDto: RandomProblemDto,
  ): Promise<Problem> {
    return this.problemService.findRandomProblem(
      randomProblemDto.disallowedIds,
    );
  }
}
