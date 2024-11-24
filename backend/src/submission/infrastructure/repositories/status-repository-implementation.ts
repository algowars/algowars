import { Inject } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { Status } from 'src/submission/domain/status';
import { StatusFactory } from 'src/submission/domain/status-factory';
import { StatusRepository } from 'src/submission/domain/status-repository';
import { StatusEntity } from '../entities/status.entity';

export class StatusRepositoryImplementation implements StatusRepository {
  @Inject() private readonly statusFactory: StatusFactory;

  async findByDescription(description: string): Promise<Status> {
    const entity = await readConnection.getRepository(StatusEntity).findOne({
      where: {
        description,
      },
    });

    return entity ? this.entityToModel(entity) : null;
  }

  private entityToModel(entity: StatusEntity): Status {
    return this.statusFactory.createFromEntity(entity);
  }
}
