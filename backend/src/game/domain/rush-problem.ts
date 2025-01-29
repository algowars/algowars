import { Problem } from 'src/problem/domain/problem';
import { RushProblemAnswer } from './rush-problem-answer';
import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export interface RushProblemProperties extends BaseDomainProperties {
  problem: Problem;
  answers: RushProblemAnswer[];
}

export interface IRushProblem extends BaseDomain {
  getProblem(): Problem;
  getAnswers(): RushProblemAnswer[];
}

export class RushProblem
  extends BaseDomainImplementation
  implements IRushProblem
{
  private readonly problem: Problem;
  private readonly answers: RushProblemAnswer[];

  constructor(properties: RushProblemProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getProblem(): Problem {
    return this.problem;
  }

  getAnswers(): RushProblemAnswer[] {
    return this.answers;
  }
}
