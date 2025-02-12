import { FindAccountBySubHandler } from './find-account-by-sub-query/find-account-by-sub.handler';
import { FindAccountByUsernameHandler } from './find-account-by-username/find-account-by-username.handler';
import { FindAccountStatsByUsernameHandler } from './find-account-stats-by-username-query/find-account-stats-by-username.handler';
import { FindProfileInformationHandler } from './find-profile-information-query/find-profile-information.handler';
import { GetAdminProblemHandler } from './get-admin-problem-query/get-admin-problem.handler';
import { GetAdminProblemsHandler } from './get-admin-problems-query/get-admin-problems.handler';

export const AccountQueryHandlers = [
  FindAccountBySubHandler,
  FindAccountByUsernameHandler,
  FindProfileInformationHandler,
  FindAccountStatsByUsernameHandler,
  GetAdminProblemsHandler,
  GetAdminProblemHandler,
];
