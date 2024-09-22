export interface Id {
  toString(): string;
  equals(id: Id): boolean;
  rawEquals(id: string): boolean;
}

export class IdImplementation implements Id {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  equals(id: Id): boolean {
    return this.toString() === id.toString();
  }

  toString(): string {
    return this.value;
  }

  rawEquals(id: string): boolean {
    return this.value === id;
  }
}
