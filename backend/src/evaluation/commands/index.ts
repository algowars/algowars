import { CreateEvaluationAnonymousHandler } from './create-evaluation-anonymous/create-evaluation-anonymous.handler';
import { CreateEvaluationHandler } from './create-evaluation/create-evaluation.handler';

export const EvaluationCommandHandlers = [
  CreateEvaluationAnonymousHandler,
  CreateEvaluationHandler,
];
