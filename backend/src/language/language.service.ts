import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Language } from 'src/data-model/models/language';

@Injectable()
export class LanguageService {
  constructor(private readonly httpService: HttpService) {}

  async getLanguages(): Promise<Language[]> {
    const observable = this.httpService
      .get<Language[]>('/languages')
      .pipe(map((response) => response.data));

    return await lastValueFrom(observable);
  }

  async findLanguageById(languageId: string): Promise<Language> {
    const observable = this.httpService
      .get<Language>(`/languages/${languageId}`)
      .pipe(map((response) => response.data));

    return await lastValueFrom(observable);
  }
}
