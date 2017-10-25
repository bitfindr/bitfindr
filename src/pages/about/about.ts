import { AlertService } from '../../providers/util/alert/alert';
import { AuthFacade } from '../../state/auth/auth.facade';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

interface AppState {
  counter: number;
}

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  constructor(
    public navCtrl: NavController,
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
