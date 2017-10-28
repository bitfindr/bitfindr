import { Action } from '@ngrx/store';

import { BaseUserProfile, UserProfile } from './../../shared/models/profile';

export enum ProfileActionTypes {
  SETUP_PROFILE = '[Profile] Setup Profile',
  EDIT_PROFILE = '[Profile] Edit Profile',
  LOAD_PROFILE = '[Profile] Load Profile',
  LOAD_PROFILE_SUCCESS = '[Profile] Load Profile Success',
  LOAD_PROFILE_FAIL = '[Profile] Load Profile Fail',
  SET_PROFILE_SUCCESS = '[Profile] Setup Profile Success',
  SET_PROFILE_FAIL = '[Profile] Setup Profile Fail',
}

export class SetupProfileAction implements Action {
  readonly type = ProfileActionTypes.SETUP_PROFILE;
  constructor(public payload: { uid: string; userProfile: BaseUserProfile }) {}
}

export class EditProfileAction implements Action {
  readonly type = ProfileActionTypes.EDIT_PROFILE;
  constructor(
    public payload: { uid: string; userProfile: Partial<UserProfile> }
  ) {}
}

export class LoadProfileAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE;
  constructor(public payload: string) {}
}

export class LoadProfileSuccessAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_SUCCESS;
  constructor(public payload: UserProfile) {}
}

export class LoadProfileFailAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_FAIL;
  constructor(public payload: any) {}
}

export class SetProfileSuccessAction implements Action {
  readonly type = ProfileActionTypes.SET_PROFILE_SUCCESS;
  constructor(public payload: Partial<UserProfile>) {}
}

export class SetProfileFailAction implements Action {
  readonly type = ProfileActionTypes.SET_PROFILE_FAIL;
  constructor(public payload: any) {}
}

export type ProfileActions =
  | SetupProfileAction
  | EditProfileAction
  | LoadProfileAction
  | LoadProfileSuccessAction
  | LoadProfileFailAction
  | SetProfileSuccessAction
  | SetProfileFailAction;
