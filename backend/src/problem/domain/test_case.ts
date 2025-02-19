import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export interface TestCaseProperties extends BaseDomainProperties {
  languageId: number;
  expectedOutput: string;
  input: string;
  output?: string;
  isEditable?: boolean;
}

export interface TestCase extends BaseDomain {
  getExpectedOutput(): string;
  getInput(): string;
  getIsEditable(): boolean;
  getLanguageId(): number;
}

export class TestCaseImplementation
  extends BaseDomainImplementation
  implements TestCase
{
  private readonly languageId: number;
  private readonly expectedOutput: string;
  private readonly input: string;
  private readonly isEditable: boolean;

  constructor(properties: TestCaseProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getExpectedOutput(): string {
    return this.expectedOutput;
  }

  getInput(): string {
    return this.input;
  }

  getIsEditable(): boolean {
    return this.isEditable;
  }

  getLanguageId(): number {
    return this.languageId;
  }
}
