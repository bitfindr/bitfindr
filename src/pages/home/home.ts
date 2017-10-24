import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { BitfindrDataProvider } from '../../providers/bitfindr-data/bitfindr-data.provider';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts;
  constructor(
    public navCtrl: NavController,
    public userData: BitfindrDataProvider) {
    this.contacts = userData.getUsers();
  }

  goToContact(contact) {
    this.navCtrl.push('ContactDetailPage', contact);
  }

}
