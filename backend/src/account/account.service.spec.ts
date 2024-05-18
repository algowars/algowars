import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import {
  MockType,
  repositoryMockFactory,
} from 'src/common/mocks/repository-mock-factory';
import { Repository } from 'typeorm';
import { Account, Player } from 'src/data-model/entities';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('AccountService', () => {
  let service: AccountService;
  let repositoryMock: MockType<Repository<Account>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Account, Player])],
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountService),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repositoryMock = module.get(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
