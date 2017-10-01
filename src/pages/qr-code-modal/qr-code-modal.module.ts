import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeModalPage } from './qr-code-modal';

@NgModule({
  declarations: [
    QrCodeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(QrCodeModalPage),
  ],
})
export class QrCodeModalPageModule {}
