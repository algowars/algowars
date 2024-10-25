import { Language } from "@/features/problem/models/language.model";
import { SubmissionResult } from "./submission-result.model";

export interface Submission {
  id: string;
  sourceCode: string;
  language: Language;
  results: SubmissionResult[];
}
