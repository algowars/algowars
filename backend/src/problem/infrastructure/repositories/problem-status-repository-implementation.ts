import { Inject } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { ProblemStatus } from 'src/problem/domain/problem-status';
import { ProblemStatusFactory } from 'src/problem/domain/problem-status-factory';
import { ProblemStatusRepository } from 'src/problem/domain/problem-status-repository';
import { ProblemStatusEntity } from '../entities/problem-status.entity';

export class ProblemStatusRepositoryImplementation
  implements ProblemStatusRepository
{
  @Inject() private readonly problemStatusFactory: ProblemStatusFactory;

  async findById(id: number): Promise<ProblemStatus | null> {
    const entity = await readConnection
      .getRepository(ProblemStatusEntity)
      .findOneBy({ id });

    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: ProblemStatus): ProblemStatusEntity {
    const status = new ProblemStatusEntity();

    status.id = model.getId().toNumber();
    status.description = model.getDescription();

    return status;
  }

  private entityToModel(entity: ProblemStatusEntity): ProblemStatus {
    return this.problemStatusFactory.createFromEntity(entity);
  }
}
