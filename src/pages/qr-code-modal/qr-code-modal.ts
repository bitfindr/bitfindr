import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qr-code-modal',
  templateUrl: 'qr-code-modal.html',
})
export class QrCodeModalPage {

  wallet: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.wallet = navParams.data.hash;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodeModalPage');
  }

  dismiss(v) {
    this.viewCtrl.dismiss();
  }

}
