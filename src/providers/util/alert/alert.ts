import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(public alertCtrl: AlertController) {}

  create(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{ text: 'OK' }],
    });

    return alert.present();
  }

  createWithError(message: string) {
    return this.create('An error has occurred.', message);
  }

  createOk(title, message): Promise<boolean> {
    return this.createWithCallback(title, message);
  }

  createYesNo(title, message): Promise<boolean> {
    return this.createWithCallback(title, message, true);
  }

  createWithCallback(
    title: string,
    message: string,
    confirmation: boolean = false
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let buttons = null;
      if (confirmation) {
        buttons = [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: _ => resolve(false),
          },
          {
            text: 'Yes',
            handler: _ => resolve(true),
          },
        ];
      } else {
        buttons = [
          {
            text: 'Ok',
            handler: _ => resolve(true),
          },
        ];
      }

      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons,
      });

      return confirm.present();
    });
  }
}
