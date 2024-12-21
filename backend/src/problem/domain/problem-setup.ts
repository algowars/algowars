import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Problem } from './problem';
import { Language } from './language';
import { Test } from './test';

export interface ProblemSetupProperties extends BaseDomainProperties {
  problem?: Problem;
  language?: Language;
  initialCode: string;
  tests?: Test[];
}

export interface ProblemSetup extends BaseDomain {
  getProblem(): Problem;
  getLanguage(): Language;
  getInitialCode(): string;
  getTests(): Test[];
}

export class ProblemSetupImplementation
  extends BaseDomainImplementation
  implements ProblemSetup
{
  private readonly problem: Problem;
  private readonly language: Language;
  private readonly initialCode: string;
  private readonly tests: Test[];

  constructor(properties: ProblemSetupProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getProblem(): Problem {
    return this.problem;
  }

  getLanguage(): Language {
    return this.language;
  }

  getInitialCode(): string {
    return this.initialCode;
  }

  getTests(): Test[] {
    return this.tests ?? [];
  }
}
