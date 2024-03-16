import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  findAccountBySub(sub: string, relations: string[] = []): Promise<Account> {
    if (!sub) {
      return null;
    }

    return this.accountRepository.findOne({
      where: {
        sub,
      },
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
