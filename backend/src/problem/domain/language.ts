import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export interface LanguageProperties extends BaseDomainProperties {
  name: string;
  isArchived: boolean;
  isAvailable: boolean;
  initialCode: string;
  initialSolution: string;
}

export interface Language extends BaseDomain {
  getName(): string;
  getIsArchived(): boolean;
  getIsAvailable(): boolean;
  getInitialCode(): string;
  getInitialSolution(): string;
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
}
