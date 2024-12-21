import { Language } from 'src/problem/domain/language';

export interface LanguageQuery {
  findById(languageId: number): Promise<Language | null>;
}
