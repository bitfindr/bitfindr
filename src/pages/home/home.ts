import { ContactDetailPage } from '../contact-detail/contact-detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts = [
    {
      image: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/537326_398837253541072_340381737_n.jpg?oh=5e70b2e405fb926ca60924b00bed80d0&oe=5A3A2969',
      name: 'Yann',
      brokers: [
        {
          image: 'assets/icon/logo-mercado-bitcoin.png',
          name: 'Mercado Bitcoin',
          wallets : [
            {
              image: 'assets/icon/bitcoin.png',
              type: 'BTC',
              hash: 'LM6wd7djUE2HMYuNksdVNHn8Qwboe2Z4eJ'
            },
            {
              image: 'assets/icon/litecoin.svg',
              type: 'LTC',
              hash: 'LM6wd7djUE2HMYuNksdVNHn8Qwboe2Z4eJ'
            }
          ]
        }
      ]
    },
    {
      image: 'https://scontent.ffor8-1.fna.fbcdn.net/v/t1.0-9/11159959_966234463399031_776048620122570080_n.jpg?oh=93b268cdf63182dcbf3033919b2dc357&oe=5A4F3820',
      name: 'Diego',
      brokers: [
        {
          image: 'assets/icon/logo-mercado-bitcoin.png',
          name: 'Mercado Bitcoin',
          wallets : [
            {
              image: 'assets/icon/bitcoin.png',
              type: 'BTC',
              hash: 'LM6wd7djUE2HMYuNksdVNHn8Qwboe2Z4eJ'
            },
            {
              image: 'assets/icon/litecoin.svg',
              type: 'LTC',
              hash: 'LM6wd7djUE2HMYuNksdVNHn8Qwboe2Z4eJ'
            }
          ]
        },
        {
          image: 'assets/icon/logo-btcyou.png',
          name: 'BitcoinToYou',
          wallets : [
            {
              image: 'assets/icon/bitcoin.png',
              type: 'BTC',
              hash: 'UE2HMYuNksdVLM6wwboe2Z4d7djNHn8QeJ'
            },
          ]
        },
      ]
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  goToContact(contact) {
    this.navCtrl.push(ContactDetailPage, contact);
  }

}
