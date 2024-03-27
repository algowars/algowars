import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dtos/create-account.dto';
import { QueryOptions } from 'src/common/query/query-options';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  findById(
    id: string,
    { relations = [], select }: QueryOptions,
  ): Promise<Account> {
    if (!id) {
      return null;
    }

    return this.accountRepository.findOne({
      where: {
        id,
      },
      select,
      relations,
    });
  }

  findBySub(
    sub: string,
    { relations = [], select }: QueryOptions,
  ): Promise<Account> {
    if (!sub) {
      return null;
    }

    return this.accountRepository.findOne({
      where: {
        sub,
      },
      select,
      relations,
    });
  }

  create(
    createAccountDto: CreateAccountDto,
    userSub: string,
  ): Promise<Account> {
    const createdAccount = this.accountRepository.create({
      ...createAccountDto,
      sub: userSub,
    });

    return this.accountRepository.save(createdAccount);
  }
}
