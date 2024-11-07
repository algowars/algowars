import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Language } from 'src/problem/domain/language';

export type AdditionalTestFileEssentialProperties = Readonly<
  Required<{
    fileName: string;
    language: Language;
    initialTestFile: string;
  }>
>;

export type AdditionalTestFileProperties =
  AdditionalTestFileEssentialProperties & BaseDomainProperties;

export interface AdditionalTestFile extends BaseDomain {
  getFileName(): string;
  getLanguage(): Language;
  getInitialTestFile(): string;
}

export class AdditionalTestFileImplementation
  extends BaseDomainImplementation
  implements AdditionalTestFile
{
  private readonly fileName: string;
  private readonly language: Language;
  private readonly initialTestFile: string;

  constructor(properties: AdditionalTestFileProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getFileName(): string {
    return this.fileName;
  }

  getLanguage(): Language {
    return this.language;
  }

  getInitialTestFile(): string {
    return this.initialTestFile;
  }
}
