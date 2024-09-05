import { Inject } from '@nestjs/common';
import {
  ENTITY_ID_TRANSFORMER,
  EntityId,
  EntityIdTransformer,
  writeConnection,
} from 'lib/database.module';
import { Problem, ProblemProperties } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';

export class ProblemRepositoryImplementation implements ProblemRepository {
  @Inject() private readonly problemFactory: ProblemFactory;
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(ProblemEntity).save(entities);
  }

  async findById(id: string): Promise<Problem | null> {
    const entity = await writeConnection.manager
      .getRepository(ProblemEntity)
      .findOneBy({ id: this.entityIdTransformer.to(id) });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Problem): ProblemEntity {
    const properties = JSON.parse(JSON.stringify(model)) as ProblemProperties;

    return {
      ...properties,
      id: this.entityIdTransformer.to(properties.id),
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: ProblemEntity): Problem {
    return this.problemFactory.reconstitute({
      ...entity,
      id: this.entityIdTransformer.from(entity.id),
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
