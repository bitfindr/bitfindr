import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, AlertOptions, App } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { BasePageEffects } from './../../../shared/base-page.effects';
import {
  AuthActionTypes,
  AuthenticateAction,
  LoginAction,
  LoginFailAction,
  FacebookAuthAction,
  FacebookAuthFailAction,
} from './../../../state';

@Injectable()
export class LoginEffects extends BasePageEffects {
  // Subject that is observed by every instance of the loading spinner
  dismissLoading = new Subject<never>();

  // Show loading spinner every time LOGIN action is dispatched.
  @Effect({ dispatch: false }) signup$ = this.actions$
    .ofType<LoginAction | FacebookAuthAction>(
      AuthActionTypes.LOGIN,
      AuthActionTypes.FACEBOOK_AUTH
    )
    .do(_ => this.showLoading());

  // Every time AUTHENTICATE is successful:
  // - Dismiss loading spinner.
  // - Navigate to TabsPage.
  @Effect({ dispatch: false }) authenticate$ = this.actions$
    .ofType<AuthenticateAction>(AuthActionTypes.AUTHENTICATE)
    .map(action => action.payload)
    .filter(authUser => !!authUser)
    .do(_ => {
      this.dismissLoading.next();
      this.navigateToTabs();
    });

  // Dismiss loading spinner every time LOGIN FAIL action is dispatched.
  // Show alert every time LOGIN FAIL actions is dispatched.
  @Effect({ dispatch: false }) signupFail$ = this.actions$
    .ofType<LoginFailAction | FacebookAuthFailAction>(
      AuthActionTypes.LOGIN_FAIL,
      AuthActionTypes.FACEBOOK_AUTH_FAIL
    )
    .map(action => action.payload)
    .do(error => {
      this.dismissLoading.next();
      this.showAlert(error);
    });

  constructor(
    private app: App,
    private actions$: Actions,
    private loadinCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    // TODO Perhaps we should define & import a symbol
    // for Page names instead of hardcoding string values?
    super('LoginPage', app);
  }

  showLoading() {
    const loader = this.loadinCtrl.create({ content: 'Authenticating ...' });

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
      message: error.message,
      enableBackdropDismiss: false,
      buttons: [ { text: 'Ok' } ],
    };

    const alert = this.alertCtrl.create(options);

    alert.present();
  }
}
