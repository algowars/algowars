import { Account, Player } from 'src/data-model/entities';
import { CreateAccountDto } from '../dtos/create-account.dto';

export class AccountMock {
  static mockAccountService(accounts: Account[] = []) {
    return {
      findById: jest.fn((id: string): Promise<Account | null> => {
        return Promise.resolve(accounts.find((acc) => acc.id === id) ?? null);
      }),
      findBySub: jest.fn((sub: string): Promise<Account | null> => {
        return Promise.resolve(accounts.find((acc) => acc.sub === sub) ?? null);
      }),
      create: jest.fn(
        ({ username }: CreateAccountDto, userSub: string): Promise<Account> => {
          const account = new Account();

          account.sub = userSub;

          const player = new Player();
          player.id = '18ddd7d4-999c-4c21-9150-7e628fe5ed1b';
          player.username = username;
          player.createdAt = new Date();
          player.updatedAt = new Date();
          player.usernameLastChanged = new Date();
          account.player = player;

          return Promise.resolve(account);
        },
      ),
    };
  }
}
