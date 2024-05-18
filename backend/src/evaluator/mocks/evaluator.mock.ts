import { Submission } from 'src/data-model/entities';

export class EvaluatorMock {
  static mockEvaluatorService(submissions: Submission[] = []) {
    return {
      batchEvaluate: jest.fn(),
      getBatchSumissions: jest.fn(),
      getSubmission: jest.fn(),
      createJudgeSubmissionTests: jest.fn(),
    };
  }
}
