import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { QueryBus } from '@nestjs/cqrs';

describe('AccountController', () => {
  let controller: AccountController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
