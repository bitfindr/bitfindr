import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  App,
  LoadingController,
  AlertController,
  AlertOptions,
} from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { AuthActionTypes } from './../../../state';

@Injectable()
export class SignupEffects {
  // Subject that is observed by every instance of the loading spinner
  dismissLoading = new Subject<never>();

  // Show loading spinner every time SIGNUP action is dispatched.
  @Effect({ dispatch: false }) signup$ = this.actions$
    .ofType(AuthActionTypes.SIGNUP)
    .do(_ => this.showLoading());

  // Every time AUTHENTICATE is successful:
  // - Dismiss loading spinner.
  // - Navigate to TabsPage.
  @Effect({ dispatch: false }) authenticate$ = this.actions$
    .ofType(AuthActionTypes.AUTHENTICATE)
    .map(toPayload)
    .filter(Boolean)
    .do(_ => {
      this.dismissLoading.next();
      this.navigateToTabs();
    });

  // Every time SIGNUP FAIL action is dispatched:
  // - Dismiss loading spinner.
  // - Show alert with error information.
  @Effect({ dispatch: false }) signupFail$ = this.actions$
    .ofType(AuthActionTypes.SIGNUP_FAIL)
    .map(toPayload)
    .do(error => {
      this.dismissLoading.next();
      this.showAlert(error);
    });

  constructor(
    private actions$: Actions,
    private app: App,
    private loadinCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  showLoading() {
    const loader = this.loadinCtrl.create({ content: 'Creating account ...' });

    loader.present();

    this.dismissLoading.asObservable()
      .take(1)
      .subscribe(_ => loader.dismiss());
  }

  navigateToTabs() {
    const navCtrl = this.app.getActiveNavs()[0];

    navCtrl.setRoot('TabsPage', null, { animate: true, direction: 'forward' });
  }

  showAlert(error: any) {
    const options: AlertOptions = {
      title: 'Oops',
      message: error && error.message || 'An error has occurred.',
      buttons: [ { text: 'Ok' } ],
    };

    const alert = this.alertCtrl.create(options);

    alert.present();
  }
}
