import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/data-model/entities';
import { Repository } from 'typeorm';

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
}
