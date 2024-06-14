import { Injectable, NotFoundException } from '@nestjs/common';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';
import { AccountSchema } from './account.schema';
import { DataSource } from 'typeorm';
import { AccountDto } from '../dto/account.dto';
import { AccountDtoFactory } from '../dto/account.dto.factory';

@Injectable()
export class AccountDtoRepository extends PageableRepository<AccountSchema> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountDtoFactory: AccountDtoFactory,
  ) {
    super(AccountSchema, dataSource);
  }

  async findById(id: string): Promise<AccountDto> {
    const account = await this.findOne({
      where: {
        id,
      },
    });

    return this.accountDtoFactory.createFromSchema(account);
  }

  async findBySub(sub: string): Promise<AccountDto> {
    const account = await this.findOne({
      where: {
        sub,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    return this.accountDtoFactory.createFromSchema(account);
  }
}
