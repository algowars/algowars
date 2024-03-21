import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Profile } from 'src/data-model/model/profile';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  findById(id: number, relations: string[] = []): Promise<Account> {
    if (!id) {
      return null;
    }

    return this.accountRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  findBySub(sub: string, relations: string[] = []): Promise<Account> {
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

  findByUsername(username: string, relations: string[] = []): Promise<Account> {
    if (!username) {
      return null;
    }

    return this.accountRepository.findOne({
      where: {
        username,
      },
      relations,
    });
  }

  async findProfileByUsername(username: string): Promise<Profile> {
    if (!username) {
      return null;
    }

    const account = await this.accountRepository.findOne({
      where: {
        username,
      },
    });

    return {
      username: account.username,
      joinedOn: account.createdAt,
    };
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
