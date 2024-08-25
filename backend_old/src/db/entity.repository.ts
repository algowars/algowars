import { AggregateRoot } from '@nestjs/cqrs'; // Import AggregateRoot for CQRS support
import { IdentifiableEntitySchema } from './identifiable-entity.schema'; // Import the schema for identifiable entities
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'; // Import TypeORM types for finding entities
import { EntitySchemaFactory } from './entity-schema.factory'; // Import the factory for creating entity schemas
import { NotFoundException } from '@nestjs/common'; // Import NotFoundException for error handling

// Define an abstract class for an entity repository
export abstract class EntityRepository<
  Schema extends IdentifiableEntitySchema, // Schema type extending IdentifiableEntitySchema
  Entity extends AggregateRoot, // Entity type extending AggregateRoot
> {
  constructor(
    protected readonly entityRepository: Repository<Schema>, // Inject the TypeORM repository for the schema
    protected readonly entitySchemaFactory: EntitySchemaFactory<Schema, Entity>, // Inject the factory for creating entity schemas
  ) { }

  // Method to find one entity by the given filter query
  protected async findOne(
    entityFilterQuery: FindOneOptions<Schema>, // Options for finding the entity
  ): Promise<Entity> {
    const entityDocument =
      await this.entityRepository.findOne(entityFilterQuery); // Attempt to find the entity

    if (!entityDocument) { // If not found, throw a NotFoundException
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument); // Convert the found document to an entity
  }

  // Method to find multiple entities based on the filter query
  protected async find(
    entityFilterQuery: FindManyOptions<Schema>, // Options for finding entities
  ): Promise<Entity[]> {
    return (await this.entityRepository.find(entityFilterQuery)).map( // Find the entities and convert each to an entity
      (entityDocument) =>
        this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  // Method to find one entity and replace it with a new entity
  protected async findOneAndReplace(
    entityFilterQuery: FindOneOptions<Schema>, // Options for finding the entity to replace
    entity: Entity, // New entity to replace the found entity
  ): Promise<void> {
    const foundEntityDocument =
      await this.entityRepository.findOne(entityFilterQuery); // Attempt to find the entity

    if (!foundEntityDocument) { // If not found, throw a NotFoundException
      throw new NotFoundException('Entity was not found.');
    }

    // Save the found entity with the new properties from the entity being replaced
    this.entityRepository.save({
      ...foundEntityDocument,
      ...this.entitySchemaFactory.create(entity),
    });
  }

  // Method to create a new entity
  async create(entity: Entity): Promise<void> {
    const schema = this.entitySchemaFactory.create(entity); // Convert the entity to its schema representation
    this.entityRepository.save(schema); // Save the schema to the repository
  }

  // Method to upsert an entity (insert or update)
  async upsert(entity: Entity): Promise<void> {
    this.entityRepository.save(this.entitySchemaFactory.create(entity)); // Save the entity schema to the repository
  }
}
