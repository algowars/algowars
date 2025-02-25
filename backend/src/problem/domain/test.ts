import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { AdditionalTestFile } from './additional-test-file';
import { TestType } from './test-type';

export interface TestProperties extends BaseDomainProperties {
  code?: string;
  additionalTestFile?: AdditionalTestFile;
  isEditable?: boolean;
  input?: string;
  expectedOutput?: string;
  testType: TestType;
  testRunner?: string;
}

export interface Test extends BaseDomain {
  getCode(): string;
  getIsEditable(): boolean;
  getAdditionalTestFile(): AdditionalTestFile | null;
  getInput(): string;
  getExpectedOutput(): string;
  getTestType(): TestType;
  getTestRunner(): string;
}

export class TestImplementation
  extends BaseDomainImplementation
  implements Test
{
  private readonly code: string;
  private readonly additionalTestFile: AdditionalTestFile | null;
  private readonly isEditable: boolean;
  private readonly input: string;
  private readonly expectedOutput: string;
  private readonly testType: TestType;
  private readonly testRunner: string;

  constructor(properties: TestProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getCode(): string {
    return this.code;
  }

  getAdditionalTestFile(): AdditionalTestFile | null {
    return this.additionalTestFile ?? null;
  }

  getIsEditable(): boolean {
    return this.isEditable;
  }

  getInput(): string {
    return this.input;
  }

  getExpectedOutput(): string {
    return this.expectedOutput;
  }

  getTestType(): TestType {
    return this.testType;
  }

  getTestRunner(): string {
    return this.testRunner ?? '';
  }
}
