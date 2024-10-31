import { Language } from "../../../problem/models/language.model";

export interface ProblemCreationModel {
  initialCode: string;
  solution: string;
  testFile: string;
  language: Language;
}
