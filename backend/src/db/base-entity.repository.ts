import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { EntityRepository } from './entity.repository';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';

export abstract class BaseEntityRepository<
  Schema extends IdentifiableEntitySchema,
  Entity extends AggregateRoot,
> extends EntityRepository<Schema, Entity> {
  async findOneById(id: string): Promise<Entity> {
    const options: FindOneOptions<Schema> = {
      where: { id } as FindOptionsWhere<Schema>,
    };
    return this.findOne(options);
  }

  async findOneAndReplaceById(id: string, entity: Entity): Promise<void> {
    this.findOneAndReplace(
      {
        where: {
          id,
        },
      } as FindOneOptions,
      entity,
    );
  }

  async findAll(): Promise<Entity[]> {
    return this.findAll();
  }
}
