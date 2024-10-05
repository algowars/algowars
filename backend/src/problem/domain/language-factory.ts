import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Language,
  LanguageImplementation,
  LanguageProperties,
} from './language';
import { LanguageEntity } from '../infrastructure/entities/language.entity';
import { IdImplementation } from 'src/common/domain/id';

type CreateLanguageOptions = Readonly<{
  id: number;
  name: string;
  isArchived?: boolean;
  isAvailable?: boolean;
}>;

export class LanguageFactory {
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
    return this.create(languageEntity);
  }

  reconstituteFromEntity(languageEntity: LanguageEntity): Language {
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
