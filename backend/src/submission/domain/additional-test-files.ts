import { BaseDomain } from 'src/common/entities/base-domain';
import { Language } from 'src/problem/domain/language';

export type AdditionalTestFilesEssentialProperties = Readonly<
  Required<{
    fileName: string;
    language: Language;
  }>
>;

export type AdditionalTestFilesProperties =
  AdditionalTestFilesEssentialProperties;

export interface AdditionalTestFiles extends BaseDomain {}
