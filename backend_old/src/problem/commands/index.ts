import { CreateProblemHandler } from './create-problem/create-problem.handler';
import { UpdateTitleHandler } from './update-title/update-title.handler';

/**
 * This array aggregates all the command handlers related to problem management.
 * It includes handlers for creating a problem and updating a problem's title.
 * This array can be provided to the module's providers to register these handlers.
 */
export const ProblemCommandHandlers = [
  CreateProblemHandler,
  UpdateTitleHandler,
];
