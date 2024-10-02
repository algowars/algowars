import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Language,
  LanguageImplementation,
  LanguageProperties,
} from './language';
import { LanguageEntity } from '../infrastructure/entities/language.entity';

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
    return this.reconstitute(languageEntity);
  }

  reconstitute(properties: LanguageProperties): Language {
    return new LanguageImplementation(properties);
  }
}
