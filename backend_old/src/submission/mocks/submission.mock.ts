import { Submission } from 'src/data-model/entities';

export class SubmissionMock {
  static mockSubmissionService(submissions: Submission[] = []) {
    return {
      createSubmission: jest.fn(),
      findById: jest.fn(),
    };
  }
}
