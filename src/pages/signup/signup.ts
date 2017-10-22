import { UserCredentials } from './../../shared/models/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { CustomValidators } from './../../shared/utils/custom-validators';
import { AuthFacade } from './../../state/auth/auth.facade';

@IonicPage({
  segment: 'signup',
  defaultHistory: ['LoginPage'],
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade
  ) {
    this.signupForm = formBuilder.group({
      /**
       * TODO (Khaled) Should we capture "profile" data on a separate page
       * because of Firebase?
       * See component template
       */
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: formBuilder.group({
        value: ['', Validators.required],
        confirmed: ['', Validators.required],
      }, { validator: CustomValidators.equalMatcher('value', 'confirmed') }),
    });
  }

  signup() {
    const formValue = this.signupForm.value;
    const credentials: UserCredentials = {
      email: formValue.email,
      password: formValue.password.value
    };

    this.authFacade.signup(credentials);
  }
}
