import { Inject } from '@nestjs/common';
import { EntityId, readConnection, writeConnection } from 'lib/database.module';
import { Problem, ProblemProperties } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';

export class ProblemRepositoryImplementation implements ProblemRepository {
  @Inject() private readonly problemFactory: ProblemFactory;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager.getRepository(ProblemEntity).save(entities);
  }

  async findById(id: string): Promise<Problem | null> {
    const entity = await readConnection
      .getRepository(ProblemEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Problem): ProblemEntity {
    const properties = JSON.parse(JSON.stringify(model)) as ProblemProperties;
    const createdBy = model.getCreatedBy();
    return {
      ...properties,
      id: model.getId().toString(),
      createdBy: {
        id: createdBy.getId().toString(),
        sub: createdBy.getSub().toString(),
        username: createdBy.getUsername().toString(),
        createdAt: createdBy.getCreatedAt(),
        updatedAt: createdBy.getUpdatedAt(),
        deletedAt: createdBy.getDeletedAt(),
        version: createdBy.getVersion(),
      },
    };
  }

  private entityToModel(entity: ProblemEntity): Problem {
    return this.problemFactory.createFromEntity(entity);
  }
}
