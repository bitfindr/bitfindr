import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthFacade } from './../../state';
import { UserCredentials } from './../../shared/models/auth';

@IonicPage({
  segment: 'login',
  defaultHistory: [],
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.required]
    });
  }

  login() {
    const credentials: UserCredentials = this.loginForm.value;

    this.authFacade.login(credentials);
  }

  facebookLogin() {
    this.authFacade.facebookAuth();
  }

  goToSignup() {
    // TODO Perhaps we should define & import a symbol
    // for Page names instead of hardcoding string values?
    this.navCtrl.push('SignupPage');
  }
}
