import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProfileFacade } from './../../state/profile/profile.facade';
import { AuthFacade } from './../../state/auth/auth.facade';
import { AlertService } from './../../providers/util/alert/alert';

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {
  constructor(
    public navCtrl: NavController,
    public profileFacade: ProfileFacade,
    private authFacade: AuthFacade,
    private alertCtrl: AlertService
  ) {}

  signout() {
    this.alertCtrl
      .createYesNo('Alert', 'Are you sure you want to sign out?')
      .then(yes => {
        return yes ? this.authFacade.signout() : null;
      });
  }
}
