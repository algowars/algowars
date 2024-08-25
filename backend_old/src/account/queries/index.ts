import { FindAccountByIdHandler } from './find-account-by-id/find-account-by-id.handler';
import { FindAccountBySubHandler } from './find-account-by-sub/find-account-by-sub.handler';

// AccountQueryHandlers is an array that holds all query handlers related to account queries.
// This array can be used to easily register all account query handlers in a module.
export const AccountQueryHandlers = [
  FindAccountBySubHandler, // Handler for queries that find accounts by 'sub'.
  FindAccountByIdHandler,  // Handler for queries that find accounts by ID.
];
