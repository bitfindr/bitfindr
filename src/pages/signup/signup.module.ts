import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';

import { SignupPage } from './signup';
import {
  signupReducer,
  SIGNUP_INITIAL_STATE as initialState
} from './state/signup.reducer';
import { SignupEffects } from './state/signup.effects';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    StoreModule.forFeature('ui-signup', signupReducer, { initialState }),
    EffectsModule.forFeature([ SignupEffects ]),
  ],
})
export class SignupPageModule {}
