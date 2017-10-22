import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import {
  loginReducer,
  LOGIN_INITIAL_STATE as initialState
} from './state/login.reducer';
import { LoginEffects } from './state/login.effects';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    StoreModule.forFeature('ui-login', loginReducer, { initialState }),
    EffectsModule.forFeature([ LoginEffects ]),
  ],
})
export class LoginPageModule {}
