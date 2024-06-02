export class UuidMock {
  public static mockUuid4(returnString: string) {
    return jest.fn(() => returnString);
  }
}
