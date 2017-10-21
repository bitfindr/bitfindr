import { User } from './../../app/User';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  login() {

  }

  facebookLogin() {
    console.log('chamar provider do facebook!');
    // this.authData.facebookLogin().then(response => {
    //   if (response == true) {
    //     this.loadingCtrl.dismiss().then(() => {
    //       this.goToHome();
    //     });
    //   } else {
    //     this.loadingCtrl.dismiss().then(() => {
    //       if (response.message) {
    //         this.alertCtrl.createWithError(response.message);
    //       }
    //     });
    //   }
    // }, error => {
    //   this.loadingCtrl.dismiss().then(() => {
    //     this.alertCtrl.createWithError(JSON.stringify(error));
    //   });
    // });
  }

  goToHome() {
    this.navCtrl.setRoot('TabsPage');
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }
}
