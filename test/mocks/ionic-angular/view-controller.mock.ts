import { of as obsOf } from 'rxjs/observable/of';

import { NavParamsMock } from './nav-params.mock';
import { NavControllerMock } from './nav-controller.mock';

export class ViewControllerMock {
  component = {};
  data = new NavParamsMock();
  instance = {};
  id = '';
  willEnter = jest.fn(_ => obsOf({}));
  didEnter = jest.fn(_ => obsOf({}));
  willLeave = jest.fn(_ => obsOf({}));
  didLeave = jest.fn(_ => obsOf({}));
  willUnload = jest.fn(_ => obsOf({}));
  didUnload = jest.fn(_ => obsOf({}));
  dismiss = jest.fn(_ => Promise.resolve());
  onDidDismiss = jest.fn(_ => Promise.resolve());
  onWillDismiss = jest.fn(_ => Promise.resolve());
  enableBack = jest.fn(_ => true);
  isFirst = jest.fn(_ => false);
  isLast = jest.fn(_ => false);
  pageRef = jest.fn(_ => ({}));
  getContent = jest.fn(_ => ({}));
  contentRef = jest.fn(_ => Promise.resolve());
  hasNavbar = jest.fn(_ => true);
  index = jest.fn(_ => true);
  subscribe = jest.fn(_ => obsOf({}));
  getNav = jest.fn(_ => new NavControllerMock());
  getIONContent = jest.fn(_ => ({}));
  writeReady = { emit(): void {}, subscribe(): any {} };
  readReady = { emit(): void {}, subscribe(): any {} };
  setBackButtonText = jest.fn();
  showBackButton = jest.fn();
  _setHeader = jest.fn();
  _setNavbar = jest.fn();
  _setNav = jest.fn();
  _setInstance = jest.fn();
  _setIONContent = jest.fn();
  _setContent = jest.fn();
  _setContentRef = jest.fn();
  _setFooter = jest.fn();
  _setIONContentRef = jest.fn();
}
