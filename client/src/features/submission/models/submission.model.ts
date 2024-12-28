import { Language } from "@/features/problem/models/language.model";
import { SubmissionResult } from "./submission-result.model";
import { SubmissionStatus } from "./submission-status";

export interface Submission {
  id: string;
  sourceCode: string;
  language: Language;
  results: SubmissionResult[];
  statuses?: SubmissionStatus[];
}
