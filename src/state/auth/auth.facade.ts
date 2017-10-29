import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of as obsOf } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserCredentials, SignupData } from './../../shared/models';
import { AuthProvider } from './../../providers/auth/auth.provider';
import {
  ApplicationState,
  AuthQuery,
  AuthActionTypes,
  AuthenticateAction,
  SignupAction,
  SignupFailAction,
  LoginAction,
  LoginFailAction,
  FacebookAuthAction,
  FacebookAuthFailAction,
  SignoutAction,
  SignoutFailAction,
  EditProfileAction,
  SetupProfileAction,
  LoadProfileAction,
} from './../../state';

@Injectable()
export class AuthFacade {
  // **************************************************************
  // Observable Queries to be shared for access by interested views
  // **************************************************************

  authUser$ = this.store
    .select(AuthQuery.getCheckedAuthState)
    .filter(isAuthenticated => !!isAuthenticated)
    .switchMap(_ => this.store.select(AuthQuery.getAuthUser));

  // ********************************************
  // Effects to be registered at the Module level
  // ********************************************

  @Effect()
  init$ = this.actions$
    .ofType(ROOT_EFFECTS_INIT)
    .switchMap(_ =>
      this.authProvider
        .checkAuthState()
        .map(authState => new AuthenticateAction(authState))
    );

  @Effect()
  signup$ = this.actions$
    .ofType<SignupAction>(AuthActionTypes.SIGNUP)
    .map(action => action.payload)
    .switchMap(data =>
      this.authProvider
        .signup(data.credentials)
        .switchMap(authUser =>
          from([
            new AuthenticateAction(authUser),
            new SetupProfileAction({
              userProfile: data.userProfile,
              uid: authUser.uid,
            }),
          ])
        )
        .catch(error => obsOf(new SignupFailAction(error)))
    );

  @Effect()
  login$ = this.actions$
    .ofType<LoginAction>(AuthActionTypes.LOGIN)
    .map(action => action.payload)
    .switchMap(credentials =>
      this.authProvider
        .signin(credentials)
        .map(authUser => new AuthenticateAction(authUser))
        .catch(error => obsOf(new LoginFailAction(error)))
    );

  @Effect()
  signout$ = this.actions$
    .ofType<SignoutAction>(AuthActionTypes.SIGNOUT)
    .switchMap(credentials =>
      this.authProvider
        .signout()
        // When firebase signOut is complete, we check authState again.
        // We'll get `null` which we dispatch through the AuthenticateAction
        .switchMap(_ =>
          this.authProvider
            .checkAuthState()
            .map(authUser => new AuthenticateAction(authUser))
        )
        .catch(error => obsOf(new SignoutFailAction(error)))
    );

  @Effect()
  facebookAuth$ = this.actions$
    .ofType<FacebookAuthAction>(AuthActionTypes.FACEBOOK_AUTH)
    .switchMap(_ =>
      this.authProvider
        .facebookAuth()
        .map(authUser => new AuthenticateAction(authUser))
        .catch(error => obsOf(new FacebookAuthFailAction(error)))
    );

  @Effect()
  authenticate$ = this.actions$
    .ofType<AuthenticateAction>(AuthActionTypes.AUTHENTICATE)
    .map(action => action.payload)
    .filter(authUser => !!authUser)
    .map(authUser => new LoadProfileAction(authUser.uid));

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private authProvider: AuthProvider
  ) {}

  // ********************
  // Auth Action creators
  // ********************

  signup(data: SignupData) {
    this.store.dispatch(new SignupAction(data));
    return this.authUser$;
  }

  login(credentials: UserCredentials) {
    this.store.dispatch(new LoginAction(credentials));
    return this.authUser$;
  }

  facebookAuth() {
    this.store.dispatch(new FacebookAuthAction());
    return this.authUser$;
  }

  signout() {
    this.store.dispatch(new SignoutAction());
  }
}
