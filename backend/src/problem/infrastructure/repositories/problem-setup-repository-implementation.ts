import { Inject } from '@nestjs/common';
import { readConnection, writeConnection } from 'lib/database.module';
import { ProblemSetup } from 'src/problem/domain/problem-setup';
import { ProblemSetupFactory } from 'src/problem/domain/problem-setup-factory';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { ProblemSetupEntity } from '../entities/problem-setup.entity';

export class ProblemSetupRepositoryImplementation
  implements ProblemSetupRepository
{
  @Inject() private readonly problemSetupFactory: ProblemSetupFactory;

  async findByProblemSlug(
    slug: string,
    languageId: number,
  ): Promise<ProblemSetup | null> {
    const entity = await readConnection
      .getRepository(ProblemSetupEntity)
      .findOne({
        where: {
          problem: {
            slug,
          },
          languageId,
        },
        relations: ['language', 'tests', 'tests.additionalTestFile'],
      });

    await entity.language;

    return entity ? this.entityToModel(entity) : null;
  }

  async save(data: ProblemSetup): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager
      .getRepository(ProblemSetupEntity)
      .save(entities);
  }

  private modelToEntity(model: ProblemSetup): ProblemSetupEntity {
    return this.problemSetupFactory.createEntityFromDomain(model);
  }

  private entityToModel(entity: ProblemSetupEntity): ProblemSetup {
    return this.problemSetupFactory.createFromEntity(entity);
  }
}
