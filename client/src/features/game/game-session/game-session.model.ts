import { Problem } from "@/features/problem/problem.model";

export interface GameSession {
  id: number;
  startTime: Date;
  problems: Problem[];
  createdAt: Date;
  updatedAt: Date;
}
