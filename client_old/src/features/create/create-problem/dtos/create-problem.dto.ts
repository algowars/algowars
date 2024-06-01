import { CreateProblemTestDto } from "./create-problem-test.dto";

export interface CreateProblemDto {
  title: string;
  slug: string;
  question: string;
  solution: string;
  languageId?: number;
  initialCode: string;
  testSetup: string;
  tests: CreateProblemTestDto[];
}
