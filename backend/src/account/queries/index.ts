import { FindAccountByIdHandler } from './find-account-by-id/find-account-by-id.handler';
import { FindAccountBySubHandler } from './find-account-by-sub/find-account-by-sub.handler';

export const AccountQueryHandlers = [
  FindAccountBySubHandler,
  FindAccountByIdHandler,
];
