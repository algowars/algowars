import { Language } from 'src/problem/domain/language';

export type AdditionalTestFilesEssentialProperties = Readonly<
  Required<{
    fileName: string;
    language: Language;
  }>
>;
