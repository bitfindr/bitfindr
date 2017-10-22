import { Action } from '@ngrx/store';

import { UserCredentials, FirebaseUserProfile } from './../../shared/models/auth';

export enum AuthActionTypes {
  SIGNUP          = '[Auth] Signup',
  SIGNUP_FAIL     = '[Auth] Signup fail',
  LOGIN           = '[Auth] Login',
  LOGIN_FAIL      = '[Auth] Login fail',
  AUTHENTICATE    = '[Auth] Authenticate user',
}

export class SignupAction implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: UserCredentials) { }
}

export class SignupFailAction implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAIL;
  constructor(public payload: any) { }
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: UserCredentials) { }
}

export class LoginFailAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
  constructor(public payload: any) { }
}

export class AuthenticateAction implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;
  constructor(public payload: FirebaseUserProfile) { }
}

export type AuthActions = SignupAction
  | SignupFailAction
  | LoginAction
  | LoginFailAction
  | AuthenticateAction;
