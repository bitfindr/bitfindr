import { Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as obsOf } from 'rxjs/observable/of';

import { NavControllerMock } from './nav-controller.mock';

export class AppMock {
  getActiveNav = jest.fn();
  getRootNav = jest.fn(_ => this.navCtrl || new NavControllerMock());
  isScrolling = jest.fn(_ => false);
  setTitle = jest.fn();
  viewDidEnter = jest.fn(_ => this.viewObservable || obsOf(undefined));
  viewDidLeave = jest.fn(_ => this.viewObservable || obsOf(undefined));
  viewDidLoad = jest.fn(_ => this.viewObservable || obsOf(undefined));
  viewWillEnter = jest.fn(_ => this.viewObservable || obsOf(undefined));
  viewWillLeave = jest.fn(_ => this.viewObservable || obsOf(undefined));
  viewWillUnload = jest.fn(_ => this.viewObservable || obsOf(undefined));

  constructor(
    @Optional() private navCtrl?: NavControllerMock,
    @Optional() private viewObservable?: Observable<any>
  ) {}
}
