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

export type CreateAdditionalTestFileOptions = Readonly<{
  id: Id;
  fileName: string;
  language: Language;
  initialTestFile: string;
  name: string;
}>;

export class AdditionalTestFileFactory
  implements EntityDomainFactory<AdditionalTestFile, AdditionalTestFileEntity>
{
  @Inject() private readonly languageFactory: LanguageFactory;

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

  createFromEntity(
    additionalTestFileEntity: AdditionalTestFileEntity,
  ): AdditionalTestFile {
    if (!additionalTestFileEntity) {
      return null;
    }

    const id = new IdImplementation(additionalTestFileEntity.id);

    return this.create({
      id,
      fileName: additionalTestFileEntity.fileName,
      language: this.languageFactory.createFromEntity(
        additionalTestFileEntity.language,
      ),
      initialTestFile: additionalTestFileEntity.initialTestFile,
      name: additionalTestFileEntity.name,
    });
  }

  createEntityFromDomain(domain: AdditionalTestFile): AdditionalTestFileEntity {
    if (!domain) {
      return null;
    }

    return {
      id: domain.getId().toString(),
      fileName: domain.getFileName(),
      name: domain.getName(),
      initialTestFile: domain.getInitialTestFile(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
      language: this.languageFactory.createEntityFromDomain(
        domain.getLanguage(),
      ),
    };
  }
}
