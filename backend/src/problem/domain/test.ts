import { Id } from 'src/common/domain/id';
import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { AdditionalTestFile } from './additional-test-file';

export type TestEssentialProperties = Readonly<
  Required<{
    id: Id;
    code: string;
  }>
>;

export type TestOptionalProperties = Readonly<
  Partial<{
    additionalTestFile: AdditionalTestFile;
  }>
>;

export type TestProperties = TestEssentialProperties &
  TestOptionalProperties &
  BaseDomainProperties;

export interface Test extends BaseDomain {
  getCode(): string;
  getAdditionalTestFile(): AdditionalTestFile;
}

export class TestImplementation
  extends BaseDomainImplementation
  implements Test
{
  private readonly code: string;
  private readonly additionalTestFile: AdditionalTestFile;

  constructor(properties: TestProperties) {
    super(properties);
    Object.assign(this, properties);
    this.additionalTestFile = properties.additionalTestFile;
  }

  getCode(): string {
    return this.code;
  }

  getAdditionalTestFile(): AdditionalTestFile {
    return this.additionalTestFile;
  }
}
