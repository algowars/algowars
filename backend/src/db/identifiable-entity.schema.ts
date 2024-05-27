import { PrimaryColumn } from 'typeorm';

export abstract class IdentifiableEntitySchema {
  @PrimaryColumn('uuid')
  readonly id: string;
}
