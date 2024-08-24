/**
 * This class provides a mock implementation of the ProblemEntityRepository
 * for use in unit tests. It includes a static method to return a mock object
 * with commonly used repository methods stubbed using Jest.
 */
export class ProblemEntityRepositoryMock {
  /**
   * Creates and returns a mock object for the ProblemEntityRepository.
   * This mock object contains Jest spies for the repository methods,
   * allowing you to define their behavior in tests.
   * 
   * @returns An object with a mock implementation of the `create` method.
   */
  public static mockProblemEntityRepository() {
    return {
      // Mocks the `create` method of the repository with Jest.
      create: jest.fn(),
    };
  }
}
