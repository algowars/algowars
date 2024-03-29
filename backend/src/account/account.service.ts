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
    { relations = [], select = {} }: QueryOptions = {},
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

  findBySub(sub: string): Promise<Account> {
    if (!sub) {
      return null;
    }

    return this.accountRepository
      .createQueryBuilder('account')
      .addSelect('account.sub')
      .leftJoinAndSelect('account.player', 'player')
      .where('account.sub = :sub', { sub })
      .getOne();
  }

  create(
    createAccountDto: CreateAccountDto,
    userSub: string,
  ): Promise<Account> {
    const createdAccount = this.accountRepository.create({
      sub: userSub,
      player: {
        username: createAccountDto.username,
        isGuest: false,
      },
    });

    return this.accountRepository.save(createdAccount);
  }
}
