import { CreateEvaluation } from 'src/evaluation/dto/request/create-evaluation.dto'; // Import the CreateEvaluation DTO

// Define the CreateEvaluationCommand class
export class CreateEvaluationCommand {
  // Constructor to initialize the command with the necessary parameters
  constructor(
    public readonly createEvaluation: CreateEvaluation, // Holds the evaluation data
    public readonly sub: string, // Holds the subscriber or related identifier
  ) { }
}
