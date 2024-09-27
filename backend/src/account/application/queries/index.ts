import { FindAccountBySubHandler } from './find-account-by-sub-query/find-account-by-sub.handler';
import { FindAccountByUsernameHandler } from './find-account-by-username-query/find-account-by-username.handler';

export const AccountQueryHandlers = [
  FindAccountBySubHandler,
  FindAccountByUsernameHandler,
];
