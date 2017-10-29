import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  FormControl,
} from '@angular/forms';

import { CustomValidators } from './../../shared/utils/custom-validators';
import { AuthFacade } from './../../state';
import { UserCredentials, BaseUserProfile } from './../../shared/models';

import { BitfindrDataProvider } from '../../providers/bitfindr-data/bitfindr-data.provider';

@IonicPage({
  segment: 'signup',
  defaultHistory: ['LoginPage'],
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  username: FormControl;
  stepOneComplete: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private userData: BitfindrDataProvider
  ) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: formBuilder.group(
        {
          value: ['', Validators.required],
          confirmed: ['', Validators.required],
        },
        { validator: CustomValidators.equalMatcher('value', 'confirmed') }
      ),
    });

    // TODO: validation function
    this.username = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        // CustomValidators.usernameAvailability(this.username.value)
      ])
    );
  }

  advanceStepTwo() {
    this.userData.getUsers().subscribe(data => {
      console.log('dataa', data);
    });

    console.log('username', this.username);
    this.stepOneComplete = true;
  }

  signup() {
    // Decompose our form to grab user credentials.
    // Since we have two controls for the ensuring that the user inputs
    // the correct password
    const formValue = this.signupForm.value;
    const credentials: UserCredentials = {
      email: formValue.email,
      password: formValue.password.value,
    };

    const userProfile: BaseUserProfile = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };

    this.authFacade.signup({ credentials, userProfile });
  }
}
