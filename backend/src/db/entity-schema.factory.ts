import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface EntitySchemaFactory<
  Schema extends IdentifiableEntitySchema,
  Entity extends AggregateRoot,
> {
  create(entity: Entity): Schema;
  createFromSchema(entitySchema: Schema): Entity;
}
