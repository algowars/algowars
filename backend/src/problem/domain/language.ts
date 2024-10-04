import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type LanguageEssentialProperties = Readonly<
  Required<{
    id: number;
    name: string;
  }>
>;

export type LanguageOptionalProperties = Readonly<
  Partial<{
    isArchived: boolean;
    isAvailable: boolean;
  }>
>;

export type LanguageProperties = LanguageEssentialProperties &
  LanguageOptionalProperties &
  BaseDomainProperties;

export interface Language extends BaseDomain {
  getName: () => string;
  getIsArchived: () => boolean;
  getIsAvailable: () => boolean;
}

export class LanguageImplementation
  extends BaseDomainImplementation
  implements Language
{
  private readonly name: string;
  private readonly isArchived: boolean;
  private readonly isAvailable: boolean;

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
}
