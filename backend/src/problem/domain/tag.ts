import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export interface TagProperties extends BaseDomainProperties {
  name: string;
}

export interface Tag extends BaseDomain {
  getName(): string;
}

export class TagImplementation extends BaseDomainImplementation implements Tag {
  private readonly name: string;

  constructor(properties: TagProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getName(): string {
    return this.name;
  }
}
