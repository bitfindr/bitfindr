import { ToastProvider } from '../../providers/toast/toast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Clipboard } from '@ionic-native/clipboard';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html',
})
export class ContactDetailPage {

  contact: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contacts: Contacts,
    private toastCtrl: ToastProvider,
    private clipboard: Clipboard,
    private dom: DomSanitizer
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

  selectContact() {
    this.contacts.pickContact()
      .then((contact: Contact) => {
        const { name, displayName, photos } = contact;
        this.contact.name = name;
        this.contact.displayName = displayName;
        this.contact.photo = photos ? this.sanitizeImage(photos[0].value) : 'assets/icon/favicon.ico';
      })
      .catch(err => this.toastCtrl.create('Ther  e was an error picking your contact: ' + err));
  }

  sanitizeImage(value){
    return this.dom.bypassSecurityTrustUrl(value)
  }

  copyToClipboard(hash) {
    this.clipboard.copy(hash)
      .then(() => this.toastCtrl.create('The wallet hash was copied to your clipboard.', 'center'))
      .catch(err => this.toastCtrl.create('There was an error copying your hash: ' + err));
  }
}
