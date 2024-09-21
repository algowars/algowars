export interface Id {
  getValue(): string;
  equals(id: Id): boolean;
  rawEquals(id: string): boolean;
}

export class IdImplementation implements Id {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  equals(id: Id): boolean {
    return this.value === id.getValue();
  }

  getValue(): string {
    return this.value;
  }

  rawEquals(id: string): boolean {
    return this.value === id;
  }
}
