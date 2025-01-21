import { Inject, Injectable } from '@nestjs/common';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { Problem } from 'src/problem/domain/problem';

export interface ProblemSetResult {
  results: Problem[];
  hasMoreProblems: boolean;
  isFinished: boolean;
  hadEnoughProblems: boolean;
}

interface ProblemSetConfig {
  startingDifficulty: number;
  stepValue: number;
  numberOfProblems: number;
}

export interface IProblemBuilderService {
  createProblemSet(config: ProblemSetConfig): Promise<Problem[]>;
}

@Injectable()
export class ProblemSetBuilderService {
  constructor(
    @Inject(ProblemInjectionToken.PROBLEM_QUERY)
    private readonly problemQuery: ProblemQuery,
  ) {}

  public async createProblemSet(
    config: ProblemSetConfig,
  ): Promise<ProblemSetResult> {
    const { startingDifficulty, stepValue, numberOfProblems } = config;
    const problemSet: Problem[] = [];
    let currentDifficulty = startingDifficulty;
    let hasMoreProblems = true;
    let isFinished = false;
    let hadEnoughProblems = false;

    for (let i = 0; i < numberOfProblems; i++) {
      try {
        const problem = await this.getProblemWithinRange(
          currentDifficulty,
          stepValue,
        );
        problemSet.push(problem);
        currentDifficulty += stepValue;
      } catch (error) {
        hasMoreProblems = false;
        break;
      }
    }

    const totalProblems = await this.problemQuery.getTotalProblems();
    const highestRatedProblem =
      await this.problemQuery.getHighestRatedProblem();

    if (problemSet.length >= numberOfProblems) {
      hadEnoughProblems = true;
    }

    if (
      problemSet.length === totalProblems ||
      currentDifficulty > highestRatedProblem.getDifficulty()
    ) {
      isFinished = true;
    }

    return {
      results: problemSet,
      hasMoreProblems,
      isFinished,
      hadEnoughProblems,
    };
  }

  private async getProblemWithinRange(
    difficulty: number,
    stepValue: number,
  ): Promise<Problem> {
    const range = 100;
    const minDifficulty = difficulty - range / 2;
    let maxDifficulty = difficulty + range / 2;

    while (true) {
      try {
        return await this.problemQuery.getProblemWithinRange(
          minDifficulty,
          maxDifficulty,
        );
      } catch (error) {
        // Expand the difficulty range by the step value if no problem is found
        maxDifficulty += stepValue;
      }
    }
  }
}
