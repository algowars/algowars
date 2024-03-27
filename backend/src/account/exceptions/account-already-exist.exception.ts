import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountLabel } from '../labels/account.label';

export class AccountAlreadyExistException extends HttpException {
  constructor() {
    super(AccountLabel.ACCOUNT_ALREADY_EXIST, HttpStatus.CONFLICT);
  }
}
