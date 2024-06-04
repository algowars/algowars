import { Injectable } from '@nestjs/common';
import { AccountSchema } from '../db/account.schema';
import { AccountDto } from './account.dto';

@Injectable()
export class AccountDtoFactory {
  createFromSchema(accountSchema: AccountSchema): AccountDto {
    return new AccountDto(
      accountSchema.id,
      accountSchema.username,
      accountSchema.createdAt,
      accountSchema.updatedAt,
    );
  }
}
