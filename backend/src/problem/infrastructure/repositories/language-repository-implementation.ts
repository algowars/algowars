import { Inject } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { Language } from 'src/problem/domain/language';
import { LanguageFactory } from 'src/problem/domain/language-factory';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { LanguageEntity } from '../entities/language.entity';

export class LanguageRepositoryImplementation implements LanguageRepository {
  @Inject() private readonly languageFactory: LanguageFactory;

  async findById(id: number): Promise<Language | null> {
    const entity = await readConnection
      .getRepository(LanguageEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByName(name: string): Promise<Language | null> {
    const entity = await readConnection
      .getRepository(LanguageEntity)
      .findOneBy({ name });
    return entity ? this.entityToModel(entity) : null;
  }

  private entityToModel(entity: LanguageEntity): Language {
    return this.languageFactory.createFromEntity(entity);
  }
}
