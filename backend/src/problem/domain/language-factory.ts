import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Language,
  LanguageImplementation,
  LanguageProperties,
} from './language';
import { LanguageEntity } from '../infrastructure/entities/language.entity';
import { IdImplementation } from 'src/common/domain/id';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';

type CreateLanguageOptions = Readonly<{
  id: number;
  name: string;
  isArchived?: boolean;
  isAvailable?: boolean;
}>;

@Injectable()
export class LanguageFactory
  implements EntityDomainFactory<Language, LanguageEntity>
{
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateLanguageOptions): Language {
    return new LanguageImplementation({
      ...options,
      id: new IdImplementation(options.id),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      version: 0,
    });
  }

  createFromEntity(languageEntity: LanguageEntity): Language {
    if (!languageEntity) {
      return null;
    }

    return this.create(languageEntity);
  }

  createEntityFromDomain(domain: Language): LanguageEntity {
    if (!domain) {
      return null;
    }

    return {
      id: domain.getId().toNumber(),
      name: domain.getName(),
      isArchived: domain.getIsArchived(),
      isAvailable: domain.getIsAvailable(),
      initialCode: domain.getInitialCode(),
      initialSolution: domain.getInitialSolution(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
    };
  }

  reconstituteFromEntity(languageEntity: LanguageEntity): Language {
    if (!languageEntity) {
      return null;
    }

    return this.reconstitute({
      id: new IdImplementation(languageEntity.id),
      name: languageEntity.name,
      createdAt: languageEntity.createdAt,
      updatedAt: languageEntity.updatedAt,
      deletedAt: languageEntity.deletedAt,
      version: languageEntity.version,
    });
  }

  reconstitute(properties: LanguageProperties): Language {
    return new LanguageImplementation(properties);
  }
}
