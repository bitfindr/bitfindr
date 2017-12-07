import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ProfileFacade } from './../../state/profile/profile.facade';
import { AuthFacade } from './../../state/auth/auth.facade';
import { AlertService } from './../../providers/util/alert/alert';

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {
  placeholder: string = 'assets/img/profile-placeholder.png';

  constructor(
    public navCtrl: NavController,
    public profileFacade: ProfileFacade,
    private authFacade: AuthFacade,
    private alertCtrl: AlertService,
    private iab: InAppBrowser
  ) {}

  signout() {
    this.alertCtrl
      .createYesNo('Alert', 'Are you sure you want to sign out?')
      .then(yes => {
        return yes ? this.authFacade.signout() : null;
      });
  }

  goToChangePassword() {
    // this.navCtrl.push('ChangePasswordPage');
  }

  goToEditProfile() {
    // this.navCtrl.push('EditProfilePage');
  }

  showPrivacyPolicy() {
    // this.modalCtrl
    //   .create('PrivacyPolicyPage')
    //   .present();
  }

  showTermsOfService() {
    // this.modalCtrl
    //   .create('TermsOfServicePage')
    //   .present();
  }

  reportBug() {
    this.openWebsite('https://github.com/bitfindr/bitfindr/issues');
  }

  sendFeedback() {
    this.openWebsite('https://github.com/bitfindr/bitfindr/issues');
  }

  goToProjectPage() {
    this.openWebsite('https://github.com/bitfindr/bitfindr');
  }

  openWebsite(url) {
    this.iab.create(url).show();
  }
}
