import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxQRCodeModule } from 'ngx-qrcode3';
import { QrCodeModalPage } from './qr-code-modal';

@NgModule({
  declarations: [
    QrCodeModalPage,
  ],
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(QrCodeModalPage),
  ],
})
export class QrCodeModalPageModule { }
