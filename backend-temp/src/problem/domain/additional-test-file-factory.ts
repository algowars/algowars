import { Language } from 'src/problem/domain/language';

import { Id, IdImplementation } from 'src/common/domain/id';
import { AdditionalTestFileEntity } from '../infrastructure/entities/additional-test-file.entity';
import {
  AdditionalTestFile,
  AdditionalTestFileImplementation,
} from './additional-test-file';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { Inject } from '@nestjs/common';
import { LanguageFactory } from './language-factory';
import { LanguageEntity } from '../infrastructure/entities/language.entity';

export type CreateAdditionalTestFileOptions = Readonly<{
  id: Id;
  fileName: string;
  language: Language;
  initialTestFile: string;
  name: string;
}>;

export class AdditionalTestFileFactory
  implements EntityDomainFactory<AdditionalTestFile>
{
  create(options: CreateAdditionalTestFileOptions): AdditionalTestFile {
    return new AdditionalTestFileImplementation({
      ...options,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
      id: options.id,
    });
  }
}
