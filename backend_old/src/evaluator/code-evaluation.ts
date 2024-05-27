export class CodeEvaluation {
  private _testSetup: string;
  private _code: string;

  public set testSetup(setup: string) {
    this._testSetup = setup;
  }

  public set code(code: string) {
    this._code = code;
  }

  build(): string {
    return `
    ${this._code}
    ${this._testSetup}
    `;
  }

  static buildWithSetup(sourceCode: string, testSetup: string): string {
    return `${sourceCode}
    ${testSetup}`;
  }
}
