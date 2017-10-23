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
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private authFacade: AuthFacade
  ) { }

  signout() {
    this.authFacade.signout();
  }

}
