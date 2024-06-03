import { CreateAccountRequest } from 'src/account/dto/request/create-account-request.dto';

export class CreateAccountCommand {
  constructor(
    public readonly createAccountRequest: CreateAccountRequest,
    public readonly sub: string,
  ) {}
}
