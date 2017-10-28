export class IonKeyboardMock {
  public static instance() {
    return {
      close: jest.fn(),
      didHide: jest.fn(),
      didShow: jest.fn(),
      eventsAvailable: jest.fn(),
      hasFocusedTextInput: jest.fn(),
      isOpen: jest.fn(_ => false),
      onClose: jest.fn(),
      willHide: jest.fn(),
      willShow: jest.fn(),
    };
  }
}
