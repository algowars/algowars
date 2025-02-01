import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Submission } from 'src/submission/domain/submission';

export interface RushProblemAnswerProperties extends BaseDomainProperties {
  answer: Submission;
}

export interface IRushProblemAnswer extends BaseDomain {
  getAnswer(): Submission;
}

export class RushProblemAnswer
  extends BaseDomainImplementation
  implements IRushProblemAnswer
{
  private readonly answer: Submission;

  constructor(properties: RushProblemAnswerProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getAnswer(): Submission {
    return this.answer;
  }
}
