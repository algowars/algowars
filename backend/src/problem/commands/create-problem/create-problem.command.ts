import { CreateProblemRequest } from '../../dto/request/create-problem-request.dto';

export class CreateProblemCommand {
  constructor(public readonly createProblemRequest: CreateProblemRequest) {}
}
