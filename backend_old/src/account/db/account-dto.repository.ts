import { Injectable, NotFoundException } from '@nestjs/common';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';
import { AccountSchema } from './account.schema';
import { DataSource } from 'typeorm';
import { AccountDto } from '../dto/account.dto';
import { AccountDtoFactory } from '../dto/account.dto.factory';

@Injectable()
// AccountDtoRepository is a service class that extends the PageableRepository to provide
// additional functionalities specific to AccountSchema. This class handles the database
// operations for account entities and converts them to AccountDto using AccountDtoFactory.
export class AccountDtoRepository extends PageableRepository<AccountSchema> {

  // The constructor initializes the repository with the data source and the DTO factory.
  constructor(
    private readonly dataSource: DataSource, // The data source for database operations.
    private readonly accountDtoFactory: AccountDtoFactory, // Factory to create AccountDto instances.
  ) {
    super(AccountSchema, dataSource); // Calls the constructor of PageableRepository with AccountSchema and dataSource.
  }

  // Finds an account by its ID and returns an AccountDto.
  async findById(id: string): Promise<AccountDto> {
    const account = await this.findOne({
      where: {
        id,
      },
    });

    // Converts the found AccountSchema to AccountDto.
    return this.accountDtoFactory.createFromSchema(account);
  }

  // Finds an account by its 'sub' field and returns an AccountDto.
  // Throws a NotFoundException if the account is not found.
  async findBySub(sub: string): Promise<AccountDto> {
    const account = await this.findOne({
      where: {
        sub,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    // Converts the found AccountSchema to AccountDto.
    return this.accountDtoFactory.createFromSchema(account);
  }
}
