export class FormMock {
  public static instance() {
    return {
      register: jest.fn(),
      nextId: jest.fn(_ => 0),
      deregister: jest.fn(),
      setAsFocused: jest.fn(),
      unsetAsFocused: jest.fn(),
      tabFocus: jest.fn(),
    };
  }
}
