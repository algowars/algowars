import { Account } from 'src/account/entities/account.entity';
declare global {
  namespace Express {
    interface Request {
      account?: Account;
    }
  }
}
