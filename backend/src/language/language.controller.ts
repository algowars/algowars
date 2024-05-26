import { Controller, Get } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from 'src/data-model/models/language';

@Controller('v1/language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  async getAvailableLanguages(): Promise<Language[]> {
    let languages = await this.languageService.getLanguages();

    languages = languages.map((language) => ({
      id: language.id,
      name: language.name,
      is_archived: language.is_archived,
    }));

    return languages.filter((language) => !language.is_archived);
  }
}
