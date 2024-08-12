import { AggregateRoot } from '@nestjs/cqrs'; // Import AggregateRoot for CQRS support
import { IdentifiableEntitySchema } from './identifiable-entity.schema'; // Import the schema for identifiable entities

// Define a generic interface for a factory that creates entity schemas
export interface EntitySchemaFactory<
  Schema extends IdentifiableEntitySchema, // Schema type extending IdentifiableEntitySchema
  Entity extends AggregateRoot, // Entity type extending AggregateRoot
> {
  // Method to create an entity schema from an entity
  create(entity: Entity): Schema;

  // Method to create an entity from an entity schema
  createFromSchema(entitySchema: Schema): Entity;
}
