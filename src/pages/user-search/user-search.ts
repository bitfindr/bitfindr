import { Observable } from 'rxjs/Rx';
import { BitpointDataProvider } from '../../providers/bitpoint-data/bitpoint-data.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  priority: 'high'
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
    public userData: BitpointDataProvider
  ) { }

  ionViewDidLoad() {
    this.userData.getUsers().subscribe(data => this.usersRef = data);
  }

  searchUser(event) {
    const val = event.srcElement.value;

    if (val && val.trim() !== '') {
      this.users = this.usersRef.filter((user) =>
         user.name.toLowerCase().includes(val.toLowerCase())
      );
    } else {
      this.users = [];
    }
  }

  goToContact(contact) {
    this.navCtrl.push('ContactDetailPage', contact);
  }
}
