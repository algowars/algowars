import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountMock } from './mocks/account.mock';
import { PlayerService } from 'src/player/player.service';
import { PlayerMock } from 'src/player/mocks/player.mock';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AuthMock } from 'src/auth/mocks/auth.mock';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: AccountMock.mockAccountService([]),
        },
        {
          provide: PlayerService,
          useValue: PlayerMock.mockPlayerService([]),
        },
      ],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue(AuthMock.mockAuthorizationGuard())
      .compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
