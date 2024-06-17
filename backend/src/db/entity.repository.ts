import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { EntitySchemaFactory } from './entity-schema.factory';
import { NotFoundException } from '@nestjs/common';

export abstract class EntityRepository<
  Schema extends IdentifiableEntitySchema,
  Entity extends AggregateRoot,
> {
  constructor(
    protected readonly entityRepository: Repository<Schema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<Schema, Entity>,
  ) {}

  protected async findOne(
    entityFilterQuery: FindOneOptions<Schema>,
  ): Promise<Entity> {
    const entityDocument =
      await this.entityRepository.findOne(entityFilterQuery);

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async find(
    entityFilterQuery: FindManyOptions<Schema>,
  ): Promise<Entity[]> {
    return (await this.entityRepository.find(entityFilterQuery)).map(
      (entityDocument) =>
        this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  protected async findOneAndReplace(
    entityFilterQuery: FindOneOptions<Schema>,
    entity: Entity,
  ): Promise<void> {
    const foundEntityDocument =
      await this.entityRepository.findOne(entityFilterQuery);

    if (!foundEntityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    this.entityRepository.save({
      ...foundEntityDocument,
      ...this.entitySchemaFactory.create(entity),
    });
  }
  async create(entity: Entity): Promise<void> {
    const schema = this.entitySchemaFactory.create(entity);
    this.entityRepository.save(schema);
  }

  async upsert(entity: Entity): Promise<void> {
    this.entityRepository.save(this.entitySchemaFactory.create(entity));
  }
}
