export class NavParamsMock {
  public static instance(getReturn?: any) {
    return {
      get: jest.fn(_ => getReturn),
    };
  }
}
