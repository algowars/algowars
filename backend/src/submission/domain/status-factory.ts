import { Id, IdImplementation } from 'src/common/domain/id';
import { Status, StatusImplementation } from './status';
import { StatusEntity } from '../infrastructure/entities/status.entity';

type CreateStatusOptions = Readonly<{
  id: Id;
  description: string;
}>;

export class StatusFactory {
  create(options: CreateStatusOptions): Status {
    return new StatusImplementation({
      ...options,
    });
  }

  createFromEntity(statusEntity: StatusEntity): Status {
    return this.create({
      ...statusEntity,
      id: new IdImplementation(statusEntity.id),
    });
  }
}
