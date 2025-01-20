import { FindSubmissionByIdHandler } from './find-submission-by-id/find-submission-by-id.handler';
import { FindUserSubmissionsByUsernameHandler } from './find-user-submissions-by-username/find-user-submissions-by-username.handler';

export const SubmissionQueryHandlers = [
  FindSubmissionByIdHandler,
  FindUserSubmissionsByUsernameHandler,
];
