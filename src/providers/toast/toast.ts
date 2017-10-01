import { Injectable } from '@angular/core';
import { Toast, ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

    toast: Toast;
    constructor(public toastCtrl: ToastController) { }

    create(message, position = 'bottom', ok = false, duration = 2000, ) {
        if (this.toast) {
            this.toast.dismiss();
        }

        this.toast = this.toastCtrl.create({
            message: message,
            duration: ok ? null : duration,
            position: position,
            showCloseButton: ok,
            closeButtonText: 'OK'
        });
        this.toast.present();
    }
}