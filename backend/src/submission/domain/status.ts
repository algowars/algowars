import { Id } from 'src/common/domain/id';

export type StatusEssentialProperties = Readonly<
  Required<{ id: Id; description: string }>
>;

export type StatusProperties = StatusEssentialProperties;

export interface Status {
  getId(): Id;
  compareId(id: Id): boolean;
  getDescription(): string;
}

export class StatusImplementation implements Status {
  private readonly id: Id;
  private readonly description: string;

  constructor(properties: StatusProperties) {
    Object.assign(this, properties);
    this.id = properties.id;
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getId(): Id {
    return this.id;
  }

  getDescription(): string {
    return this.description;
  }
}
