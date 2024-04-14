export interface CreateProblemDto {
  title: string;
  slug: string;
  question: string;
  solution: string;
  languageId?: number;
}
