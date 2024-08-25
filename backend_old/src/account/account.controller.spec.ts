import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('AccountController', () => {
  let controller: AccountController;

  // The beforeEach block sets up the testing module before each test.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController], // Registers the AccountController in the testing module.
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() }, // Mocks the CommandBus with jest.fn() to spy on method calls.
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() }, // Mocks the QueryBus with jest.fn() to spy on method calls.
        },
      ],
    }).compile();

    // Retrieves the AccountController instance from the testing module.
    controller = module.get<AccountController>(AccountController);
  });

  // Test case to check if the controller is defined.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
