import { Language } from 'src/problem/domain/language';

import { Id, IdImplementation } from 'src/common/domain/id';
import { AdditionalTestFileEntity } from '../infrastructure/entities/additional-test-file.entity';
import {
  AdditionalTestFile,
  AdditionalTestFileImplementation,
} from './additional-test-file';

export type CreateAdditionalTestFileOptions = Readonly<{
  id: Id;
  fileName: string;
  language: Language;
  initialTestFile: string;
  name: string;
}>;

export class AdditionalTestFileFactory {
  create(options: CreateAdditionalTestFileOptions): AdditionalTestFile {
    return new AdditionalTestFileImplementation({
      ...options,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
    });
  }

  createFromEntity(
    additionalTestFileEntity: AdditionalTestFileEntity,
  ): AdditionalTestFile {
    const id = new IdImplementation(additionalTestFileEntity.id);

    return this.create({
      id,
      fileName: additionalTestFileEntity.fileName,
      language: additionalTestFileEntity.language,
      initialTestFile: additionalTestFileEntity.initialTestFile,
      name: additionalTestFileEntity.name,
    });
  }
}
