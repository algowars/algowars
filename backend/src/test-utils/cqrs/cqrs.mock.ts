export class CqrsMock {
  public static mockCommandBus() {
    return {
      exectue: jest.fn(),
    };
  }

  public static mockQueryBus() {
    return {
      execute: jest.fn(),
    };
  }
}
