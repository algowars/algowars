import { FindAccountBySubHandler } from './find-account-by-sub-query/find-account-by-sub.handler';
import { FindAccountByUsernameHandler } from './find-account-by-username/find-account-by-username.handler';
import { FindProfileInformationHandler } from './find-profile-information-query/find-profile-information.handler';

export const AccountQueryHandlers = [
  FindAccountBySubHandler,
  FindAccountByUsernameHandler,
  FindProfileInformationHandler,
];
