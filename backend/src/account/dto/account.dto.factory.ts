import { Injectable } from '@nestjs/common';
import { AccountSchema } from '../db/account.schema';
import { AccountDto } from './account.dto';

@Injectable()
// AccountDtoFactory is a service class that provides a method to create AccountDto instances from AccountSchema.
export class AccountDtoFactory {

  // Method to create an AccountDto from an AccountSchema.
  createFromSchema(accountSchema: AccountSchema): AccountDto {
    return new AccountDto(
      accountSchema.id, // Maps the id from AccountSchema to AccountDto.
      accountSchema.username, // Maps the username from AccountSchema to AccountDto.
      accountSchema.createdAt, // Maps the createdAt timestamp from AccountSchema to AccountDto.
      accountSchema.updatedAt, // Maps the updatedAt timestamp from AccountSchema to AccountDto.
    );
  }
}
