import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Language,
  LanguageImplementation,
  LanguageProperties,
} from './language';
import { IdImplementation } from 'src/common/domain/id';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';

type CreateLanguageOptions = Readonly<{
  id: number;
  name: string;
  isArchived?: boolean;
  isAvailable?: boolean;
}>;

@Injectable()
export class LanguageFactory implements EntityDomainFactory<Language> {
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

  reconstitute(properties: LanguageProperties): Language {
    return new LanguageImplementation(properties);
  }
}
