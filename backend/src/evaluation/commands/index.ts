import { CreateEvaluationAnonymousHandler } from './create-evaluation-anonymous/create-evaluation-anonymous.handler'; // Import the anonymous evaluation handler
import { CreateEvaluationHandler } from './create-evaluation/create-evaluation.handler'; // Import the regular evaluation handler

// Export an array containing all evaluation command handlers
export const EvaluationCommandHandlers = [
  CreateEvaluationAnonymousHandler, // Add anonymous evaluation handler
  CreateEvaluationHandler, // Add regular evaluation handler
];
