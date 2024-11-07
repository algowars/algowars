import { Inject } from '@nestjs/common';
import { EntityId, readConnection } from 'lib/database.module';
import { Id, IdImplementation } from 'src/common/domain/id';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { AdditionalTestFileFactory } from 'src/problem/domain/additional-test-file-factory';
import { AdditionalTestFileRepository } from 'src/problem/domain/additional-test-file-repository';
import { AdditionalTestFileEntity } from '../entities/additional-test-file.entity';

export class AdditionalTestFileRepositoryImplementation
  implements AdditionalTestFileRepository
{
  @Inject()
  private readonly additionalTestFileFactory: AdditionalTestFileFactory;

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async findById(id: number): Promise<AdditionalTestFile | null> {
    const entity = await readConnection
      .getRepository(AdditionalTestFileEntity)
      .findOneBy({ id: id.toString() });

    return entity ? this.entityToModel(entity) : null;
  }

  private entityToModel(entity: AdditionalTestFileEntity): AdditionalTestFile {
    return this.additionalTestFileFactory.createFromEntity(entity);
  }
}
