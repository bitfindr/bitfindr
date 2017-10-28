import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BitfindrDataProvider } from '../../providers/bitfindr-data/bitfindr-data.provider';

@IonicPage({
  priority: 'high',
})
@Component({
  selector: 'page-user-search',
  templateUrl: 'user-search.html',
})
export class UserSearchPage {
  users = [];
  usersRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: BitfindrDataProvider
  ) {}

  ionViewDidLoad() {
    this.userData.getUsers().subscribe(data => {
      console.log(data);
      this.usersRef = data;
    });
  }

  searchUser(event) {
    const val = event.srcElement.value;

    if (val && val.trim() !== '') {
      this.users = this.usersRef.filter(user => {
        let displayName = `${user.firstName} ${user.lastName}`;

        return displayName.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.users = [];
    }
  }

  goToContact(contact) {
    this.navCtrl.push('ContactDetailPage', contact);
  }
}
