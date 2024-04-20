export class CodeEvaluation {
  private _testSetup: string;
  private _code: string;

  public set testSetup(setup: string) {
    this._testSetup = setup;
  }

  public set code(code: string) {
    this._testSetup = code;
  }

  build(): string {
    return `
    ${this._testSetup}
    ${this._code}
    `;
  }
}
