import { createSelector } from '@ngrx/store';

import { ProfileActions, ProfileActionTypes } from './profile.actions';
import { UserProfile } from './../../shared/models';
import { ApplicationState } from './../app.state';

export interface ProfileState {
  userProfile: UserProfile;
}

export const PROFILE_INITIAL_STATE: ProfileState = {
  userProfile: null,
};

export function profileReducer(
  state = PROFILE_INITIAL_STATE,
  action: ProfileActions
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.LOAD_PROFILE_SUCCESS:
    case ProfileActionTypes.SET_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
}

export namespace ProfileQuery {
  export const getProfileState = (state: ApplicationState) => state.profile;

  export const getUserProfile = createSelector(
    getProfileState,
    state => state.userProfile
  );
}
