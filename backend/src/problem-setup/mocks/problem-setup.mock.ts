import { ProblemSetup } from 'src/data-model/entities';

export class ProblemSetupMock {
  static mockProblemSetupService(setups: ProblemSetup[] = []) {
    return {
      findProblemSetupByIds: jest.fn(
        (
          problemId: number,
          languageId: number,
        ): Promise<ProblemSetup | null> => {
          return Promise.resolve(
            setups.find(
              (s) => s.languageId === languageId && s.problemId === problemId,
            ) ?? null,
          );
        },
      ),
    };
  }
}
