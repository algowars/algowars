import { Submission } from 'src/submission/domain/submission';
import { Language } from './language';
import { Problem } from './problem';
import { Id } from 'src/common/domain/id';
import { Test } from 'src/problem/domain/test';

export type ProblemSetupEssentialProperties = Readonly<
  Required<{
    problemId: Id;
    languageId: Id;
    initialCode: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
    tests: Test[];
    solution: Submission;
  }>
>;

export type ProblemSetupOptionalProperties = Readonly<
  Partial<{ language: Language; problem: Problem }>
>;

export type ProblemSetupProperties = ProblemSetupEssentialProperties &
  ProblemSetupOptionalProperties;

export interface ProblemSetup {
  getProblemId(): Id;
  getLanguageId(): Id;
  getProblem(): Problem;
  getLanguage(): Language;
  getTests(): Test[];
  getInitialCode(): string;
  getCreatedAt(): Date;
  getUpdatedAt(): Date;
  getDeletedAt(): Date | null;
  getSolution(): Submission;
  setSolution(solution: Submission): void;
  getVersion(): number;
}

export class ProblemSetupImplementation implements ProblemSetup {
  private readonly problemId: Id;
  private readonly languageId: Id;
  private readonly problem: Problem;
  private readonly language: Language;
  private readonly initialCode: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;
  private readonly tests: Test[];
  private solution: Submission;

  constructor(properties: ProblemSetupProperties) {
    Object.assign(this, properties);
    this.tests = properties.tests;
  }

  getProblemId(): Id {
    return this.problemId;
  }

  getProblem(): Problem {
    return this.problem;
  }

  getLanguageId(): Id {
    return this.languageId;
  }

  getLanguage(): Language {
    return this.language;
  }

  getTests(): Test[] {
    return this.tests;
  }

  getInitialCode(): string {
    return this.initialCode;
  }

  getSolution(): Submission {
    return this.solution;
  }

  setSolution(solution: Submission): void {
    this.solution = solution;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getVersion() {
    return this.version;
  }
}
