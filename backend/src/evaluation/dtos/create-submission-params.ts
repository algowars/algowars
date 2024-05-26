import { Problem, ProblemSetup, Test } from 'src/data-model/entities';

export class CreateSubmissionParams {
  _problem: Problem;
  _problemSetup: ProblemSetup;
  _sourceCode: string;
  _languageId: number;
  _tests: Test[];

  public get problem(): Problem {
    return this._problem;
  }

  public set problem(problem: Problem) {
    this._problem = problem;
  }

  public get problemSetup(): ProblemSetup {
    return this._problemSetup;
  }

  public set problemSetup(problemSetup: ProblemSetup) {
    this._problemSetup = problemSetup;
  }

  public get sourceCode(): string {
    return this.sourceCode;
  }

  public set sourceCode(sourceCode: string) {
    this._sourceCode = sourceCode;
  }

  public get languageId(): number {
    return this._languageId;
  }

  public set languageId(languageId: number) {
    this._languageId = languageId;
  }

  public get tests(): Test[] {
    return this._tests;
  }

  public set tests(tests: Test[]) {
    this._tests = tests;
  }
}
