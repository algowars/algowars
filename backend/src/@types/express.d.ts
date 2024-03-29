import { Account } from 'src/account/entities/account.entity'; // Update the import path as necessary

declare global {
  namespace Express {
    interface Request {
      account?: Account;
    }
  }
}
