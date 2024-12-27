import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export interface AdditionalTestFileProperties extends BaseDomainProperties {
  fileName: string;
  name: string;
  initialTestFile: string;
}

export interface AdditionalTestFile extends BaseDomain {
  getFileName(): string;
  getName(): string;
  getInitialTestFile(): string;
}

export class AdditionalTestFileImplementation
  extends BaseDomainImplementation
  implements AdditionalTestFile
{
  private readonly fileName: string;
  private readonly name: string;
  private readonly initialTestFile: string;

  constructor(properties: AdditionalTestFileProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getFileName(): string {
    return this.fileName;
  }

  getName(): string {
    return this.name;
  }

  getInitialTestFile(): string {
    return this.initialTestFile;
  }
}
