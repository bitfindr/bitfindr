import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactDetailPage } from '../contact-detail/contact-detail';

@IonicPage()
@Component({
  selector: 'page-user-search',
  templateUrl: 'user-search.html',
})
export class UserSearchPage {

  users = [];
  usersRef = [{name: 'john'}, {name: 'jorge'}, {name: 'andre'}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

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
    this.navCtrl.push(ContactDetailPage, contact);
  }
}
