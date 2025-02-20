import { ProblemStatus } from "./problem-status";
import { Problem } from "./problem.model";

export interface AdminProblem extends Problem {
  status: ProblemStatus;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
