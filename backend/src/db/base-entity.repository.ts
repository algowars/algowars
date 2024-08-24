import { AggregateRoot } from '@nestjs/cqrs'; // Import AggregateRoot for CQRS support
import { IdentifiableEntitySchema } from './identifiable-entity.schema'; // Import the schema for identifiable entities
import { EntityRepository } from './entity.repository'; // Import the base entity repository
import { FindOneOptions, FindOptionsWhere } from 'typeorm'; // Import TypeORM types for finding entities

// Define an abstract class for a base entity repository
export abstract class BaseEntityRepository<
  Schema extends IdentifiableEntitySchema, // Schema type extending IdentifiableEntitySchema
  Entity extends AggregateRoot, // Entity type extending AggregateRoot
> extends EntityRepository<Schema, Entity> { // Extend the base entity repository with generic types

  // Method to find a single entity by its ID
  async findOneById(id: string): Promise<Entity> {
    const options: FindOneOptions<Schema> = { // Create find options with the specified ID
      where: { id } as FindOptionsWhere<Schema>, // Specify the condition for finding the entity
    };
    return this.findOne(options); // Call the base findOne method with the options
  }

  // Method to find and replace an entity by its ID
  async findOneAndReplaceById(id: string, entity: Entity): Promise<void> {
    // Call the base findOneAndReplace method with the ID and new entity
    this.findOneAndReplace(
      {
        where: {
          id, // Condition to find the entity by ID
        },
      } as FindOneOptions, // Cast to FindOneOptions for TypeORM compatibility
      entity, // The new entity to replace the found entity
    );
  }

  // Method to find all entities of the given type
  async findAll(): Promise<Entity[]> {
    return this.findAll(); // Call the base findAll method to retrieve all entities
  }
}
