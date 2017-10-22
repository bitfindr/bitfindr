import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ])
      ]
    });
  }

  login() {
    this.email = this.loginForm.value['email'];
    this.password = this.loginForm.value['password'];

    console.log(this.email, this.password);
    console.log('chamar provider de Auth!');
  }

  facebookLogin() {
    console.log('chamar provider do facebook!');
  }

  goToHome() {
    this.navCtrl.setRoot('TabsPage');
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }
}
