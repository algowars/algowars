import { CreateAccountRequest } from 'src/account/dto/request/create-account-request.dto';

// Define the CreateAccountCommand class
export class CreateAccountCommand {
  // Constructor to initialize the CreateAccountCommand object
  constructor(
    // The createAccountRequest parameter of type CreateAccountRequest
    public readonly createAccountRequest: CreateAccountRequest,
    // The sub parameter of type string
    public readonly sub: string,
  ) { }
}
