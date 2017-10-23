import { ClipboardProvider } from '../../providers/clipboard/clipboard.provider';
import { QrCodeModalPage } from '../qr-code-modal/qr-code-modal';
import { ToastProvider } from '../../providers/util/toast/toast';
import { Component, Renderer } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField } from '@ionic-native/contacts';
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
    private clipboard: ClipboardProvider,
    public modalCtrl: ModalController,
    public renderer: Renderer
  ) {
    this.contact = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

  selectContact() {
    this.contacts.pickContact()
      .then((contact: Contact) => {
        const { name, displayName, photos } = contact;
        this.contact.name = name;
        this.contact.displayName = displayName;
        this.contact.photo = photos ? photos[0].value : 'assets/icon/favicon.ico';
      })
      .catch(err => this.toastCtrl.create('There was an error picking your contact: ' + err));
  }

  copyToClipboard(hash) {
    this.clipboard.copy(hash, this.renderer)
      .then(() => this.toastCtrl.create('The wallet hash was copied to your clipboard.', 'center'))
      .catch(err => this.toastCtrl.create('There was an error copying your hash: ' + err));
  }

  showQrCode(wallet) {
    const modal = this.modalCtrl.create(QrCodeModalPage, { hash: wallet });
    modal.present();
  }
}
