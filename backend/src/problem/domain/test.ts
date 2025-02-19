import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { AdditionalTestFile } from './additional-test-file';

export interface TestProperties extends BaseDomainProperties {
  code: string;
  additionalTestFile?: AdditionalTestFile;
  isEditable?: boolean;
}

export interface Test extends BaseDomain {
  getCode(): string;
  getIsEditable(): boolean;
  getAdditionalTestFile(): AdditionalTestFile | null;
}

export class TestImplementation
  extends BaseDomainImplementation
  implements Test
{
  private readonly code: string;
  private readonly additionalTestFile: AdditionalTestFile | null;
  private readonly isEditable: boolean;

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
}
