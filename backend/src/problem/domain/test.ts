import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { AdditionalTestFile } from './additional-test-file';

export interface TestProperties extends BaseDomainProperties {
  code: string;
  additionalTestFile: AdditionalTestFile;
}

export interface Test extends BaseDomain {
  getCode(): string;
  getAdditionalTestFile(): AdditionalTestFile | null;
}

export class TestImplementation
  extends BaseDomainImplementation
  implements Test
{
  private readonly code: string;
  private readonly additionalTestFile: AdditionalTestFile | null;

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
}
