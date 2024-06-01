import { CreateProblemHandler } from './create-problem/create-problem.handler';
import { UpdateTitleHandler } from './update-title/update-title.handler';

export const ProblemCommandHandlers = [
  CreateProblemHandler,
  UpdateTitleHandler,
];
