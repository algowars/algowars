import { Id } from 'src/common/domain/id';

export type StatusEssentialProperties = Readonly<
  Required<{ id: Id; name: string }>
>;

export type StatusProperties = StatusEssentialProperties;

export interface Status {
  compareId: (id: Id) => boolean;
  getName: () => string;
}

export class StatusImplementation implements Status {
  private readonly id: Id;
  private readonly name: string;

  constructor(properties: StatusProperties) {
    Object.assign(this, properties);
    this.id = properties.id;
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getName(): string {
    return this.name;
  }
}
