import { PrimaryColumn } from 'typeorm'; // Import PrimaryColumn decorator from TypeORM

// Define an abstract class for identifiable entity schemas
export abstract class IdentifiableEntitySchema {
  // Define a primary column for the entity with UUID type
  @PrimaryColumn('uuid') // Decorator indicating this is a primary key column
  readonly id: string; // Readonly property representing the unique identifier for the entity
}
