import { AccountModel } from "../AccountModel";
import { ProblemSolutionModel } from "./ProblemSolutionModel";

export interface ProblemModel {
  id: number;
  title: string;
  question: string;
  titleSlug: string;
  createdBy?: AccountModel;
  createdAt: Date;
  updatedAt: Date;
  solution?: ProblemSolutionModel;
}
