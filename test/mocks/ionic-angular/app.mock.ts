import { Observable } from 'rxjs/Observable';
import { of as obsOf } from 'rxjs/observable/of';

import { NavControllerMock } from './nav-controller.mock';

export class AppMock {
  public static instance(
    navCtrl?: NavControllerMock,
    viewObservable?: Observable<any>
  ) {
    return {
      getActiveNav: jest.fn(),
      getRootNav: jest.fn(_ => navCtrl || NavControllerMock.instance()),
      isScrolling: jest.fn(_ => false),
      setTitle: jest.fn(),
      viewDidEnter: jest.fn(_ => viewObservable || obsOf(undefined)),
      viewDidLeave: jest.fn(_ => viewObservable || obsOf(undefined)),
      viewDidLoad: jest.fn(_ => viewObservable || obsOf(undefined)),
      viewWillEnter: jest.fn(_ => viewObservable || obsOf(undefined)),
      viewWillLeave: jest.fn(_ => viewObservable || obsOf(undefined)),
      viewWillUnload: jest.fn(_ => viewObservable || obsOf(undefined)),
    };
  }
}
