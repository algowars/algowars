import { HttpException, HttpStatus } from '@nestjs/common';
import { AccountLabel } from '../labels/account.label';

export class AccountNotOwnedException extends HttpException {
  constructor() {
    super(AccountLabel.ACCOUNT_NOT_OWNED, HttpStatus.CONFLICT);
  }
}
