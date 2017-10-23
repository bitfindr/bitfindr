import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of as obsOf } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ApplicationState } from './../app.state';
import { AuthProvider } from './../../providers/auth/auth';
import { AuthQuery } from './auth.reducer';
import { UserCredentials } from './../../shared/models/auth';
import {
    AuthActionTypes,
    AuthenticateAction,
    LoginAction,
    LoginFailAction,
    SignoutAction,
    SignoutFailAction,
    SignupAction,
    SignupFailAction,
} from './auth.actions';

@Injectable()
export class AuthFacade {
  /**
   * Observable Queries to be shared for access by interested views
   */

  authUser$ = this.store.select(AuthQuery.getCheckedAuthState)
    .filter(isAuthenticated => !!isAuthenticated)
    .switchMap(_ => this.store.select(AuthQuery.getAuthUser));

  /**
   * Effects to be registered at the Module level
   */

  @Effect() signup$ = this.actions$
    .ofType<SignupAction>(AuthActionTypes.SIGNUP)
    .map(action => action.payload)
    .switchMap(credentials =>
      this.authProvider.signup(credentials)
        .map(authUser => new AuthenticateAction(authUser))
        .catch(error => obsOf(new SignupFailAction(error)))
    );

  @Effect() login$ = this.actions$
    .ofType<LoginAction>(AuthActionTypes.LOGIN)
    .map(action => action.payload)
    .switchMap(credentials =>
      this.authProvider.signin(credentials)
        .map(authUser => new AuthenticateAction(authUser))
        .catch(error => obsOf(new LoginFailAction(error)))
    );

  @Effect() signout$ = this.actions$
    .ofType<SignoutAction>(AuthActionTypes.SIGNOUT)
    .switchMap(credentials =>
      this.authProvider.signout()
        .map(authUser => new AuthenticateAction(authUser))
        .catch(error => obsOf(new SignoutFailAction(error)))
    );

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private authProvider: AuthProvider
  ) {
    authProvider.checkAuthState()
      .subscribe(authState => this.store.dispatch(new AuthenticateAction(authState)));
  }

  /**
   * Auth Action creators
   */

  signup(credentials: UserCredentials) {
    this.store.dispatch(new SignupAction(credentials));
    return this.authUser$;
  }

  login(credentials: UserCredentials) {
    this.store.dispatch(new LoginAction(credentials));
    return this.authUser$;
  }

  signout() {
    this.store.dispatch(new SignoutAction());
    return this.authUser$;
  }
}
