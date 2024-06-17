export class ProblemEntityRepositoryMock {
  public static mockProblemEntityRepository() {
    return {
      create: jest.fn(),
    };
  }
}
