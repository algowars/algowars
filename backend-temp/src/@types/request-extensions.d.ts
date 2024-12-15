import { Account } from 'src/account/domain/account';

declare module 'express' {
  export interface Request {
    account?: Account;
  }
}
