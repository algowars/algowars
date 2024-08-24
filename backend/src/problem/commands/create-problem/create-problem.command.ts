import { CreateProblemRequest } from '../../dto/request/create-problem-request.dto';

/**
 * This class defines a command for creating a problem.
 * It encapsulates the data needed to create a problem, which is passed via the CreateProblemRequest DTO.
 */
export class CreateProblemCommand {
  /**
   * Constructor that initializes the CreateProblemCommand with the provided CreateProblemRequest.
   * @param createProblemRequest - The request object containing the necessary data to create a problem.
   */
  constructor(public readonly createProblemRequest: CreateProblemRequest) { }
}
