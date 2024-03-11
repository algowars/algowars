import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountLabel } from '../labels/account.label';

export class AccountNotFoundException extends HttpException {
  constructor() {
    super(AccountLabel.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
