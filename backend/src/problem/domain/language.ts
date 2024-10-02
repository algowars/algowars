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
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }>
>;

export type LanguageProperties = LanguageEssentialProperties &
  LanguageOptionalProperties;

export interface Language {
  compareId: (id: number) => boolean;
  getName: () => string;
  getIsArchived: () => boolean;
  getIsAvailable: () => boolean;
}

export class LanguageImplementation implements Language {
  private readonly id: number;
  private readonly name: string;
  private readonly isArchived: boolean;
  private readonly isAvailable: boolean;

  constructor(properties: LanguageProperties) {
    Object.assign(this, properties);
  }

  compareId(id: number): boolean {
    return this.id === id;
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
