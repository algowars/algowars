import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';

export type LanguageEssentialProperties = Readonly<
  Required<{
    name: string;
  }>
>;

export type LanguageOptionalProperties = Readonly<
  Partial<{
    isArchived: boolean;
    isAvailable: boolean;
    initialCode: string;
    initialSolution: string;
    additionalTestFiles?: AdditionalTestFile[];
  }>
>;

export type LanguageProperties = LanguageEssentialProperties &
  LanguageOptionalProperties &
  BaseDomainProperties;

export interface Language extends BaseDomain {
  getName(): string;
  getIsArchived(): boolean;
  getIsAvailable(): boolean;
  getInitialCode(): string;
  getInitialSolution(): string;
  getAdditionalTestFiles(): AdditionalTestFile[];
}

export class LanguageImplementation
  extends BaseDomainImplementation
  implements Language
{
  private readonly name: string;
  private readonly isArchived: boolean;
  private readonly isAvailable: boolean;
  private readonly initialCode: string;
  private readonly initialSolution: string;
  private readonly additionalTestFiles: AdditionalTestFile[];

  constructor(properties: LanguageProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getName(): string {
    return this.name;
  }

  getIsArchived(): boolean {
    return this.isArchived;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  getInitialCode(): string {
    return this.initialCode;
  }

  getInitialSolution(): string {
    return this.initialSolution;
  }

  getAdditionalTestFiles(): AdditionalTestFile[] {
    return this.additionalTestFiles;
  }
}
