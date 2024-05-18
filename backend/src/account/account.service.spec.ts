import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import {
  MockType,
  repositoryMockFactory,
} from 'src/common/mocks/repository-mock-factory';
import { Repository } from 'typeorm';
import { Account, Player } from 'src/data-model/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<Account>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useFactory: repositoryMockFactory,
        },

        {
          provide: getRepositoryToken(Player),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
