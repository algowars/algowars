import { CreateEvaluationAnonymous } from 'src/evaluation/dto/request/create-evaluation-anonymous.dto'; // Import the DTO for anonymous evaluation requests

// Define the CreateEvaluationAnonymousCommand class
export class CreateEvaluationAnonymousCommand {
  constructor(
    public readonly createEvaluationAnonymous: CreateEvaluationAnonymous, // The DTO containing details for the anonymous evaluation
    public readonly sub: string, // The subscription identifier for the user
  ) { }
}
