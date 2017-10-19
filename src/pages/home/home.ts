import { BitpointDataProvider } from '../../providers/bitpoint-data/bitpoint-data.provider';
import { ContactDetailPage } from '../contact-detail/contact-detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts;
  constructor(
    public navCtrl: NavController,
    public userData: BitpointDataProvider) {
    this.contacts = userData.getUsers();
  }

  goToContact(contact) {
    this.navCtrl.push(ContactDetailPage, contact);
  }

}
