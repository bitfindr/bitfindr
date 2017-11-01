export class FormMock {
  register = jest.fn();
  nextId = jest.fn(_ => 0);
  deregister = jest.fn();
  setAsFocused = jest.fn();
  unsetAsFocused = jest.fn();
  tabFocus = jest.fn();
}
