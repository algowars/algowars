import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthMock } from 'src/auth/mocks/auth.mock';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CanActivate } from '@nestjs/common';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const mockAuthGuard: CanActivate = AuthMock.mockAuthGuard();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
