import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { ApplicationState } from './../app.state';
import { AuthProvider } from './../../providers/auth/auth';
import { AuthQuery } from './auth.reducer';
import { FirebaseUserProfile, UserCredentials } from './../../shared/models/auth';
import { AuthActionTypes, SignupAction, AuthenticateAction } from './auth.actions';

@Injectable()
export class AuthFacade {
  /**
   * Observable Queries to be shared for access by interested views
   */

  authUser$ = this.store.select(AuthQuery.getCheckedAuthState)
    .filter(Boolean)
    .switchMap(_ => this.store.select(AuthQuery.getAuthUser));

  /**
   * Effects to be registered at the Module level
   */

  @Effect() signup$ = this.actions$
    .ofType(AuthActionTypes.SIGNUP)
    .map(toPayload)
    .switchMap(credentials =>
      this.authProvider.signup(credentials)
        .map(authUser => new AuthenticateAction(authUser))
    );

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private authProvider: AuthProvider
  ) {
    authProvider.checkAuthState()
      .subscribe(authState => this.store.dispatch(new AuthenticateAction(authState)));
  }

  signup(credentials: UserCredentials) {
    this.store.dispatch(new SignupAction(credentials));
    return this.authUser$;
  }
}
