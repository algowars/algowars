export interface Id {
  toString(): string;
  toNumber(): number;
  equals(id: Id): boolean;
  rawEquals(id: string): boolean;
  getValue(): string | number;
}

export class IdImplementation implements Id {
  private readonly value: string | number;

  constructor(id: string | number) {
    this.value = id;
  }

  equals(id: Id): boolean {
    return this.toString() === id.toString();
  }

  toString(): string {
    return `${this.value}`;
  }

  toNumber(): number {
    const numValue = Number(this.value);
    if (isNaN(numValue)) {
      throw new Error(
        `Id value "${this.value}" cannot be converted to a number.`,
      );
    }
    return numValue;
  }

  getValue(): string | number {
    return this.value;
  }

  rawEquals(id: string): boolean {
    return this.value === id;
  }
}
