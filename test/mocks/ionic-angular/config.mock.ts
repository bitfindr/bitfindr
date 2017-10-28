export class ConfigMock {
  public static instance() {
    return {
      get: jest.fn(_ => ''),
      getBoolean: jest.fn(_ => true),
      getNumber: jest.fn(_ => 0),
      set: jest.fn(),
      settings: jest.fn(),
      setModeConfig: jest.fn(),
      getModeConfig: jest.fn(),
      setTransition: jest.fn(),
      getTransition: jest.fn(),
    };
  }
}
