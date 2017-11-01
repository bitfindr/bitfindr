import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { ApplicationState } from './../app.state';
import { BitfindrDataProvider } from './../../providers/bitfindr-data/bitfindr-data.provider';
import { ProfileQuery } from './profile.reducer';
import {
  ProfileActionTypes,
  EditProfileAction,
  SetupProfileAction,
  SetProfileSuccessAction,
  LoadProfileAction,
  LoadProfileSuccessAction,
} from './profile.actions';

@Injectable()
export class ProfileFacade {
  // **************************************************************
  // Observable Queries to be shared for access by interested views
  // **************************************************************

  userProfile$ = this.store.select(ProfileQuery.getUserProfile);

  @Effect()
  loadProfile$ = this.actions$
    .ofType<LoadProfileAction>(ProfileActionTypes.LOAD_PROFILE)
    .map(action => action.payload)
    .switchMap(uid => this.bitfindrData.loadProfile(uid))
    .map(userProfile => new LoadProfileSuccessAction(userProfile));

  @Effect()
  setupProfile$ = this.actions$
    .ofType<SetupProfileAction>(ProfileActionTypes.SETUP_PROFILE)
    .map(action => action.payload)
    .switchMap(data =>
      this.bitfindrData.setupProfile(data.uid, data.userProfile)
    )
    .map(userProfile => new SetProfileSuccessAction(userProfile));

  @Effect({ dispatch: false })
  editProfile$ = this.actions$
    .ofType<EditProfileAction>(ProfileActionTypes.EDIT_PROFILE)
    .map(action => action.payload)
    .switchMap(data =>
      this.bitfindrData.editProfile(data.uid, data.userProfile)
    );

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private bitfindrData: BitfindrDataProvider
  ) {}
}
