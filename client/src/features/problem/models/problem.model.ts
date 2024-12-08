import { ProblemStatus } from "./problem-status";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy?: string;
  initialCode?: string;
  status?: ProblemStatus;
}
