import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { EntityRepository } from './entity.repository';
import { FindOneOptions } from 'typeorm';

export abstract class BaseEntityRepository<
  Schema extends IdentifiableEntitySchema,
  Entity extends AggregateRoot,
> extends EntityRepository<Schema, Entity> {
  async findOneById(id: string): Promise<Entity> {
    return this.findOne({ id } as FindOneOptions<Schema>);
  }

  async findOneAndReplaceById(id: string, entity: Entity): Promise<void> {
    this.findOneAndReplace(
      {
        id,
      } as FindOneOptions,
      entity,
    );
  }

  async findAll(): Promise<Entity[]> {
    return this.findAll();
  }
}
