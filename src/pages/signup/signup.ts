import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: any;
  email: AbstractControl;
  password: AbstractControl;
  passwordConfirm: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  signup() {}
}
