export class DatabaseMock {
  public static mockDataSource() {
    return {
      createEntityManager: jest.fn(),
    };
  }
}
