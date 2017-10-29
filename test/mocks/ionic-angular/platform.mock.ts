export class PlatformMock {
  dir = jest.fn(_ => '');
  getQueryParam = jest.fn(_ => '');
  height = jest.fn(_ => 0);
  is = jest.fn(_ => true);
  isLandscape = jest.fn(_ => false);
  isPortrait = jest.fn();
  isRTL = jest.fn(_ => true);
  lang = jest.fn(_ => 'en');
  pause = jest.fn();
  platforms = jest.fn(_ => []);
  ready = jest.fn(_ => Promise.resolve());
  registerBackButtonAction = jest.fn(_ => () => {});
  resize = jest.fn();
  resume = jest.fn();
  setDir = jest.fn();
  setLang = jest.fn();
  testUserAgent = jest.fn();
  url = jest.fn(_ => '');
  version = jest.fn(_ => []);
  width = jest.fn(_ => 0);
  doc = jest.fn(_ => document);
  registerListener = jest.fn();
  win = jest.fn(_ => window);
  getActiveElement = jest.fn(_ => document.activeElement);
  raf = jest.fn(_ => 1);
  hasFocus = jest.fn(_ => true);
  getElementComputedStyle = jest.fn(_ => ({
    paddingLeft: '10',
    paddingTop: '10',
    paddingRight: '10',
    paddingBottom: '10',
  }));
  timeout = jest.fn(_ => (callback: any, timer: number) =>
    setTimeout(callback, timer)
  );
}
